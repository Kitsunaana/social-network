import { isEmail } from "../util.js"

const igroupEmail = document.querySelector('[data-igroup="email"]')
const igroupName = document.querySelector('[data-igroup="name"]')
const igroupSurname = document.querySelector('[data-igroup="surname"]')
const igroupPassword = document.querySelector('[data-igroup="password"]')
const igroupConfirm = document.querySelector('[data-igroup="confirm"]')
const regButton = document.querySelector('[data-action="reg"]')

main()

function main () {
    regButton.addEventListener('click', validate)  
}

function validate () {
    let flag = true

    // Валидация имени
    const name = igroupName.querySelector('input').value.trim()  
    const nameFormFloating = igroupName.querySelector('.form-floating') 
    const nameInput = igroupName.querySelector('input')  

    nameFormFloating.classList.remove('is-invalid')    
    nameInput.classList.remove('is-invalid')   

    if (!name) {
        flag = false
        nameFormFloating.classList.add('is-invalid')  
        nameInput.classList.add('is-invalid')  
    } else {
        nameFormFloating.classList.add('is-valid')  
        nameInput.classList.add('is-valid')  
    }
    // Валидация имени

    // Валидация фамилии
    const surname = igroupSurname.querySelector('input').value.trim()  
    const surnameFormFloating = igroupSurname.querySelector('.form-floating')
    const surnameInput = igroupSurname.querySelector('input')  

    surnameFormFloating.classList.remove('is-invalid')  
    surnameInput.classList.remove('is-invalid') 

    if (!surname) {
        flag = false
        surnameFormFloating.classList.add('is-invalid')  
        surnameInput.classList.add('is-invalid')  
    } else {
        surnameFormFloating.classList.add('is-valid')  
        surnameInput.classList.add('is-valid')
    }
    // Валидация фамилии

    // Валидация почты
    const email = igroupEmail.querySelector('input').value.trim() 
    const emailFormFloating = igroupEmail.querySelector('.form-floating') 
    const emailInput = igroupEmail.querySelector('input')

    emailFormFloating.classList.remove('is-invalid') 
    emailInput.classList.remove('is-invalid') 

    if (!isEmail(email)) {
        flag = false
        emailFormFloating.classList.add('is-invalid')
        emailInput.classList.add('is-invalid')
    } else {
        emailFormFloating.classList.add('is-valid')
        emailInput.classList.add('is-valid')  
    }
    // Валидация почты

    // Валидация пароля
    const password = igroupPassword.querySelector('input').value
    const passwordFormFloating = igroupPassword.querySelector('.form-floating')
    const passwordInput = igroupPassword.querySelector('input')  

    passwordFormFloating.classList.remove('is-invalid')  
    passwordInput.classList.remove('is-invalid') 

    if (password.length < 3) {
        flag = false
        passwordFormFloating.classList.add('is-invalid')  
        passwordInput.classList.add('is-invalid')  
    } else {
        passwordFormFloating.classList.add('is-valid')  
        passwordInput.classList.add('is-valid')
    }
    // Валидация пароля

    // Валидация подтверждения пароля
    const confirmPassword = igroupConfirm.querySelector('input').value
    const confirmFormFloating = igroupConfirm.querySelector('.form-floating')
    const confirmInput = igroupConfirm.querySelector('input')  

    confirmFormFloating.classList.remove('is-invalid')  
    confirmInput.classList.remove('is-invalid') 

    if (password !== confirmPassword || confirmPassword.length < 3) {
        flag = false
        confirmFormFloating.classList.add('is-invalid')  
        confirmInput.classList.add('is-invalid')  
    } else {
        confirmFormFloating.classList.add('is-valid')  
        confirmInput.classList.add('is-valid')
    }
    // Валидация подтверждения пароля

    if (flag) {
        registration()
    }

}

async function registration () {
    const name = igroupName.querySelector('input').value.trim()  
    const nameFormFloating = igroupName.querySelector('.form-floating') 
    const nameInput = igroupName.querySelector('input')  

    nameFormFloating.classList.remove('is-invalid')    
    nameInput.classList.remove('is-invalid')   

    const surname = igroupSurname.querySelector('input').value.trim()  
    const surnameFormFloating = igroupSurname.querySelector('.form-floating')
    const surnameInput = igroupSurname.querySelector('input')  

    surnameFormFloating.classList.remove('is-invalid')  
    surnameInput.classList.remove('is-invalid') 

    const email = igroupEmail.querySelector('input').value.trim() 
    const emailFormFloating = igroupEmail.querySelector('.form-floating') 
    const emailInput = igroupEmail.querySelector('input')

    emailFormFloating.classList.remove('is-invalid') 
    emailInput.classList.remove('is-invalid') 

    const password = igroupPassword.querySelector('input').value
    const passwordFormFloating = igroupPassword.querySelector('.form-floating')
    const passwordInput = igroupPassword.querySelector('input')  
    passwordInput.value = ''

    passwordFormFloating.classList.remove('is-invalid')  
    passwordInput.classList.remove('is-invalid') 

    const confirmPassword = igroupConfirm.querySelector('input').value
    const confirmFormFloating = igroupConfirm.querySelector('.form-floating')
    const confirmInput = igroupConfirm.querySelector('input')  
    confirmInput.value = ''

    confirmFormFloating.classList.remove('is-invalid')  
    confirmInput.classList.remove('is-invalid') 

    try {
        const response = await fetch('/api/reg', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password }) 
        })

        if (response.ok) {
            alert('Регистрация прошла успешно')
            location.href = '/index.html'
            return
        }

    } catch (error) {
        console.log(error)
    }
}