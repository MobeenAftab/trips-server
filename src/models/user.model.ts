import { Schema, model, ObjectId } from 'mongoose'

interface User {
    email: string
    firstName: string
    middleName: string
    lastName: string
    password: string
    mobilenumber: number
    homePhone: number
    emergencyContactName: string
    emergencyContactnumber: number
    canDrive: boolean
    trips: ObjectId
    isAdmin: boolean
    accountCreatedOn: Date
}
