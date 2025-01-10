export const fetchData=async (path: string)=> {
  try {
    const resp = await fetch(`/Assets/${path}`);
    if (!resp.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await resp.json();
    return data; // Возвращаем данные
  } catch (error) {
    return null
  }
}

export const fetchMenuSectionTitle=async ()=> {
  return await fetchData('Slides/title.json');
}

export const fetchFooters =async ()=> {
  return await fetchData('Footers.json');
}
