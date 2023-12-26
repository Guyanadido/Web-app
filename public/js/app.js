const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const par1 = document.querySelector('#message-1')
const par2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    par1.textContent = 'loading message...'
    par2.textContent = ''
    fetch(`http://localhost:3000/weather/?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                par1.style.color = 'red'
                return par1.textContent = data.error
            }

            par1.style.color = 'black'
            par1.textContent = data.location
            par2.textContent = data.response
        })
    })
})