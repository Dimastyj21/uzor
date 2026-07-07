import axiosInstance from "@/shared/api/axiosInstance"
import React, { useState } from "react"

interface RegisterFormProps {
    onSuccess?: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async ( e: React.FormEvent, formData) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            axiosInstance
            .post("/auth/signup", formData)
            .then((res) => {
                set
            })
        } catch (err) {
            
        }
    }
}