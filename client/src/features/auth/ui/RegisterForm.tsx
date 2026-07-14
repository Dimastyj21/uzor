import axiosInstance from "@/shared/api/axiosInstance"
import React, { useState } from "react"

interface RegisterFormProps {
    onSuccess?: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })


    const handleSubmit = async ( e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await axiosInstance.post("/auth/signup", formData)
                setUser(res.data.user)
                setAccessToken(res.data.accessToken)
                if(onSuccess) onSuccess()
        } catch (err) {
            setError('Ошибка регистрации');
            console.error(err)
        } finally{
            setLoading(false)
        }
    }
    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return(

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Регистрация</h2>
            {error && <div className="text-red-500 text-center">{error}</div>}

        <input 
        type="text" 
        name="name"
        placeholder="имя"
        value={formData.name}
        onChange={handleChange}
        className="px-4 py-2 border rounded"
        />
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
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
        </form>
    )
}