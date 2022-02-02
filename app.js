const getData = async () => {
    const res = await fetch('./data.json')
    const json = await res.json()
    return json
}

const createToolTip = ({name, population}) => {
    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip')
    const html = `<h3>${name}</h3><p>Population: ${ population ? population.toLocaleString() : 'No Data'}</p>`
    tooltip.innerHTML = html
    return tooltip
}

const runApp = async () => {

    try {
        const data = await getData()
        const keys = Object.keys(data).map(i => i.toLowerCase())
        const values = Object.values(data)
        const counties = [ ...document.querySelectorAll('.county') ] 

        for(const county of counties) {

            county.addEventListener('mouseover', e => {
                const { target } = e
                const { top, left, width } = target.getBoundingClientRect()

                target.classList.add('active')
                const name = target.getAttribute('title')

                const index = keys.findIndex(i => i === name.replace(/\s/g, '').toLowerCase())

                let population = null
                if(index !== -1) {
                    population = values[index]
                }
                
                const tooltip = createToolTip({name, population})
                document.body.appendChild(tooltip)

                tooltip.style.top = `${top}px`
                tooltip.style.left = `${left + width + 10}px`
            
            })

            county.addEventListener('mouseleave', e => {
                const { target } = e
                target.classList.remove('active')
                const tooltip = document.querySelector('.tooltip')
                tooltip.remove()
            })
        }
    } catch (error) {
        console.log(error); 
    }
}

runApp()