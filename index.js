let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

//render the stuff that you already have saved
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render()
}

// const tabs = [
//     {url: "https://www.linkedin.com/in/ifenna-ekwunife"}
// ]


//save the current tab I am on
tabBtn.addEventListener("click", function() {
    //Get the URL of the current Tab

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)

      })

   

})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render()
})



inputBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render()

    console.log(localStorage.getItem("myLeads"))
})


function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++){

        // The closing of the quotation mark is to add in the href attribute for the anchor tag
        // listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>"
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>
                    ${leads[i]}
                </a>
            </li>
            
            `


    }
    ulEL.innerHTML = listItems
}