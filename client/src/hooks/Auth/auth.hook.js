import {useCallback, useEffect, useState} from "react";

const storageName = 'userData';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

  const login = useCallback((jwtToken, id, isTeacher) => {
    setToken(jwtToken)
    setUserId(id)
    setIsTeacher(isTeacher)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, isTeacher
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setIsTeacher(false)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token){
      login(data.token, data.userId, data.isTeacher)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, isTeacher }
}