document.addEventListener('DOMContentLoaded', () => {
    // modal
    const handleToggleModal = () => {
        const modal = document.querySelector('.modal')
        const listItems = document.querySelectorAll('.preview__item')

        listItems.forEach(item => {
            item.addEventListener('click', () => {
                modal.classList.add('modal--active')
            })
        })

        const modalCloseButton = document.querySelectorAll('.button__close')
        const modalCloseIcon = document.querySelector('.modal__close')

        const handleRemoveModalClass = () => {
            modal.classList.remove('modal--active')
        }

        modalCloseIcon.addEventListener('click', handleRemoveModalClass)

        modalCloseButton.forEach(item => {
            item.addEventListener('click', handleRemoveModalClass)
        })
    }

    handleToggleModal()

    // form
    const listInputs = document.querySelectorAll('.form__input')
    const listInputsImage = document.querySelectorAll('.form__input-image')

    const formValues = {
        email: '',
        name: '',
        country: '',
        terms: false
    }

    const handleValidate = (name, value, parent) => {
        const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const regExName = /^[А-яA-z\-\s)(]*$/

        const valueLength = value?.toString().length

        if (name === 'email') {
            if (regExEmail.test(value) && valueLength > 0) {
                parent.classList.remove('form__item--invalid')
                parent.classList.add('form__item--valid')
                return formValues.email = value
            } else {
                parent.classList.remove('form__item--valid')
                parent.classList.add('form__item--invalid')
            }
        } else if (name === 'name') {
            if (regExName.test(value) && valueLength > 0) {
                parent.classList.remove('form__item--invalid')
                parent.classList.add('form__item--valid')
                return formValues.name = value
            } else {
                parent.classList.remove('form__item--valid')
                parent.classList.add('form__item--invalid')
            }
        }
    }

    listInputs.forEach(item => {
        const parent = item.parentElement.parentElement // get .form__item

        item.addEventListener('focus', () => {
            parent.classList.add('form__item--active')
        })

        item.addEventListener('input', event => {
            const name = event.target.name
            const value = event.target.value
            item.setAttribute('value', value)
            handleValidate(name, value, parent)
        })

        item.addEventListener('blur', event => {
            if (event.target.value.toString().length <= 0) {
                parent.classList.remove('form__item--active')
                parent.classList.remove('form__item--invalid')
                parent.classList.remove('form__item--valid')
            }
        })
    })

    listInputsImage.forEach(item => {
        item.addEventListener('click', () => {
            const previousElement = item.previousElementSibling
            const parentElement = item.parentElement.parentElement
            previousElement.value = null
            parentElement.classList.remove('form__item--invalid')
            parentElement.classList.remove('form__item--valid')
        })
    })

    const select = document.querySelector('.select')
    const selectValue = document.querySelector('.select__value')
    const selectContent = document.querySelector('.select__content')
    const selectItem = document.querySelectorAll('.select__item')
    const selectError = document.querySelector('.select__error')

    select.addEventListener('click', () => {
        select.classList.add('select--active')
        select.classList.remove('form__item--invalid')
        selectContent.classList.toggle('select__content--active')
    })

    selectItem.forEach(item => {
        item.addEventListener('click', event => {
            const value = item.getAttribute('data-value')
            select.classList.add('select--selected')
            select.classList.remove('select--active')
            select.classList.remove('form__item--invalid')
            select.classList.add('form__item--valid')
            selectError.classList.remove('d-flex')
            selectValue.textContent = value

            return formValues.country = value
        })
    })

    const checkbox = document.querySelector('.form__checkbox')
    const checkboxError = document.querySelector('.checkbox__error')

    checkbox.addEventListener('click', () => {
        const value = checkbox.checked
        checkboxError.classList.remove('d-flex')
        return formValues.terms = value
    })

    const inputEmail = document.querySelector('div[data-input="email"]')
    const inputName = document.querySelector('div[data-input="name"]')
    const form = document.querySelector('.form')

    form.addEventListener('submit', handleSubmitForm)

    async function handleSubmitForm(event) {
        event.preventDefault()

        if (Object.values(formValues).filter(value => !value).length === 0) {
            console.log(formValues)
            await fetch('/', {
                method: 'POST',
                body: ''
            })
            .then(data => console.log(data.data))
        } else {

            if(!formValues.email) {
                inputEmail.classList.add('form__item--active', 'form__item--invalid')
            }

            if(!formValues.name) {
                inputName.classList.add('form__item--active', 'form__item--invalid')
            }

            if (!formValues.country) {
                select.classList.add('form__item--invalid')
            }

            if (!formValues.terms) {
                checkboxError.classList.add('d-flex')
            }
        }
    }
})
