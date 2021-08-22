let myEmojis = ["💻", "🚲", "🍔", "🐕"]

const pushBtn = document.getElementById("push-btn")
const unshiftBtn = document.getElementById("unshift-btn")
const popBtn = document.getElementById("pop-btn")
const shiftBtn = document.getElementById("shift-btn")
const emojiInput = document.getElementById("emoji-input")
const emojiContainer = document.getElementById("emoji-container")
let add = ""

const createTemplateBtn = document.getElementById("create-template-btn")
const templateNameInput = document.getElementById("template-name-input")
let templates = ""
let template = ""
const templatesBtnWrapper = document.getElementById("templates-btn-wrapper")
const deleteTemplatesBtn = document.getElementById("delete-templates-btn")
 templates = JSON.parse(localStorage.getItem("templates"))
if (JSON.parse(localStorage.getItem("templates"))) {
    templates = JSON.parse(localStorage.getItem("templates"))
} else {
    templates = []
}

renderEmojis()
renderTemplateBtns()

function renderEmojis() {
    emojiContainer.innerHTML = ""
    emojiInput.value = ""
    for (let i = 0; i < myEmojis.length; i++) {
        const emoji = document.createElement('span')
        emoji.textContent = myEmojis[i]
        emojiContainer.append(emoji)
    }
}


// editing emojis
function editEmojis(command) {
    if (add) {
        if (emojiInput.value) {
            myEmojis[command](emojiInput.value)
        }
    } else {
        myEmojis[command]()
    }
    renderEmojis()
}

pushBtn.addEventListener("click", function(){
    add = true
    editEmojis("push")
})

unshiftBtn.addEventListener("click", function(){
    add = true
    editEmojis("unshift")
})

popBtn.addEventListener("click", function(){
    add = false
    editEmojis("pop")
})

shiftBtn.addEventListener("click", function(){
    add = false
    editEmojis("shift")
})
//editing emojis end

//templates
createTemplateBtn.addEventListener("click", function() {
    if (templateNameInput.value) {
        // if (!isNew()) {
        //     templateNameInput.setAttribute("placeholder", "Type a new unique name")
        // } else {
        localStorage.setItem(templateNameInput.value, JSON.stringify(myEmojis))
        templates.push(templateNameInput.value)
        localStorage.setItem("templates", JSON.stringify(templates))
        templateNameInput.value = ""
        renderTemplateBtns()
        // }
    } else {
        templateNameInput.setAttribute("placeholder", "Type the template name")
    }
})

// function isNew() {
//     if (JSON.parse(localStorage.getItem(templates))) {
//         templates = JSON.parse(localStorage.getItem(templates))
//         for (let i = 0; i < templates.length; i++) {
//             template = templates[i]
//             if (template === templateNameInput) {
//                 return false
//             }
//         }
//     }
// }

function renderTemplateBtns() {
    templatesBtnWrapper.innerHTML = ""
    for (let i = 0; i < templates.length; i++) {
        template = JSON.parse(localStorage.getItem(templates[i]))
        const templateBtn = document.createElement("button")
        templateBtn.textContent = templates[i]
        templateBtn.addEventListener("click", function(){
            myEmojis = JSON.parse(localStorage.getItem(templateBtn.textContent))
            renderEmojis()
        })
        templatesBtnWrapper.appendChild(templateBtn)
    }
}

deleteTemplatesBtn.addEventListener("click", function(){
    localStorage.clear()
    myEmojis = ["💻", "🚲", "🍔"]
    renderEmojis()
    templatesBtnWrapper.innerHTML = ""
    templates = []
})
//templates end