const setLocalData = (keyName, data) => {
    localStorage.setItem(keyName, JSON.stringify(data));
}

const getLocalData = (keyName) => {
    const data = localStorage.getItem(keyName);
    return data || null
}

const clearLocalData = () => {
    localStorage.clear()
}

export { setLocalData, getLocalData, clearLocalData };