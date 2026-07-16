import axiosInstance from "@/shared/api/axiosInstance"
import { Email } from "@mui/icons-material"
import React, { useState } from "react"

interface LoginFormProps {
    onSuccess?: () => void
}

export const LoginForm = ({onSuccess}: LoginFormProps) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await axiosInstance.post("/auth/signin", formData)
            setUser(res.data.user)
            setAccessToken(res.data.accessToken)
            if(onSuccess) onSuccess()
        } catch (error) {
            setError('Ошибка асинхронная')
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev =>({
            ...prev,
            [name]: value
        }))
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
            type="email" 
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            />
            <input 
            type="password" 
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border rounded"
            />
            <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                Вход
            </button>
        </form>
    )
}