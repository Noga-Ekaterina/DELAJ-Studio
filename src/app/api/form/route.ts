// app/api/telegram-submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import {IForm} from "@/typesData";
import {fetchData} from "@/utils/fetchData";

interface IBody{
  vacancy: string
  values: { [key: string]: string | boolean, acceptTerms: boolean}
  }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { values, vacancy } = body as IBody
    const formText: null|IForm= await fetchData('Slides/Vacancy/form.json')

    // Быстрые проверки на обязательные данные
    if (!formText || !vacancy || !values) {
      return NextResponse.json(
          { error: 'Отсутствуют обязательные данные' },
          { status: 400 }
      )
    }

    // Проверка acceptTerms
    if (!values.acceptTerms) {
      return NextResponse.json(
          { error: 'Необходимо принять условия' },
          { status: 400 }
      )
    }

    // Оптимизированная проверка совпадения ключей
    const formFieldNames = new Set(formText.inputs.map(input => input.name))
    const valueKeys = Object.keys(values)

    // Исключаем acceptTerms из проверки, так как это служебное поле
    const valueKeysWithoutTerms = valueKeys.filter(key => key !== 'acceptTerms')

    // Быстрая проверка через Set
    if (formFieldNames.size !== valueKeysWithoutTerms.length) {
      return NextResponse.json(
          { error: 'Несоответствие количества полей' },
          { status: 400 }
      )
    }

    // Проверяем, что все ключи из values (кроме acceptTerms) есть в formFieldNames
    const hasAllKeys = valueKeysWithoutTerms.every(key => formFieldNames.has(key))

    if (!hasAllKeys) {

      return NextResponse.json({
        error: 'Несоответствие полей формы',
      }, { status: 400 })
    }

    // TEST

    return NextResponse.json(
        { success: true, message: 'Форма успешно отправлена' },
        { status: 200 }
    )

    // Формирование текста сообщения
    let text = `<b>${vacancy}</b>%0A%0A`

    // Используем forEach для производительности
    formText?.inputs.forEach((input: { placeholder: { ru: string }; name: string }) => {
      text += `<b>${input.placeholder.ru}:</b> ${values[input.name]}%0A`
    })

    text = text.replaceAll('+', '%2b')

    // Отправка в Telegram
    const telegramResponse = await fetch(
        `https://api.telegram.org/bot${process.env.TG_BOT_TOKEN}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=html&text=${text}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
    )

    if (!telegramResponse.ok) {
      throw new Error('Ошибка отправки в Telegram')
    }

    return NextResponse.json(
        { success: true, message: 'Форма успешно отправлена' },
        { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
        { error: 'Внутренняя ошибка сервера' },
        { status: 500 }
    )
  }
}