let menuBtn = document.querySelector('#menuBtn');
let navBtn = document.querySelectorAll(".barOps a");
let pin = document.querySelector('.pin');
let openBx = document.querySelector('.openBx');
let noteBx = document.querySelector('#addnote');
let closeBx = document.querySelector('.closeBx');
let submitBx = document.querySelector('.submitBx');
let trashPg = document.querySelector('.trashPg');

/*---------Functions---------*/


// toggle
menuBtn.onclick = () => {
    document.querySelector('.barOps').classList.toggle('active');
    document.querySelector('.displayBx').classList.toggle('active');
}

// Display or not NotFunctional Page
let dORn = (e) => {
    let notWorking = ["Notes"];
    let word = e.lastChild.innerHTML;
    if(notWorking.includes(word) != true){
        document.querySelector('.contentBx .nfounBx').classList.add('active');
    }
    else{
        document.querySelector('.contentBx .nfounBx').classList.remove('active');
    }
}



//active
navBtn.forEach ((e) => {
    e.onclick = () => {
        // Add Active Class
        navBtn.forEach((j) => {
            j.classList.remove("activeBtn");
        });
        e.classList.add("activeBtn");
        dORn(e);
    }
})

// show editBx
openBx.onclick = () => {
    noteBx.classList.add('active');
}

// getdata & close bx.
let close = () => {noteBx.classList.remove('active');}
closeBx.onclick = () => {
    close();
}


// Get Title From Input Box
let getTtile  = (title,box) => {
    let h3 = document.createElement('h3');
    h3.setAttribute('class','title');
    if(title != ''){
        h3.innerHTML = title;
    }
    else{
        h3.innerHTML = 'Title';
    }
    box.appendChild(h3);
}

// Get Notes From Input Box
let getNote = (note,box) => {
    let p = document.createElement('p');
    p.setAttribute('class','urNotes');
    if(note !== ''){
        p.innerHTML =  note;
    }
    else{
        p.innerHTML = 'Take a note...'
    }
    box.appendChild(p);
}

// Put Additional Features Dynamicly
let getAdditionalFe = (box) => {
    let icons= ["notifications-outline","person-add-outline","color-palette-outline","archive-outline","ellipsis-vertical","pin-outline"];
    let iconBx = document.createElement('div')
    iconBx.setAttribute('class',"iconBox");

    icons.forEach(e => {
        let a = document.createElement('a');
        let ion = document.createElement('ion-icon');
        ion.setAttribute('name',e);
        a.appendChild(ion);
        iconBx.appendChild(a);
    })
    box.appendChild(iconBx);

}

// Put Trash Button On Box for notes
let trashData = (box) => {
    let a = document.createElement('a');
    a.setAttribute('class' ,'remove');
    a.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    box.appendChild(a);
    a.onclick = () => {
        box.remove();
    }
}




// make note pin
pin.onclick = () => {
    pin.classList.toggle('active');
}

// Get All Funtionality while click to save 
submitBx.onclick = () => {
    close();
    let title = document.querySelector('#titleBx').value;
    let note = document.querySelector('#noteBx').value;
    let displayBx = document.querySelector('.displayBx')
    let box = document.createElement('div');
    box.setAttribute('class','box');
    getTtile(title,box);
    getNote(note,box);
    getAdditionalFe(box);
    trashData(box);
    edit(box);
    displayBx.appendChild(box);
}


// edidting & reading
let edit = (box) => {
    let boxs = [box.childNodes[0],box.childNodes[1]];
    boxs.forEach(e => {
        e.onclick = () => {
            openEditBx(box);
        }
    })
    
}

let openEditBx = (box) => {
    let editingContainer = document.querySelector('.container');
        editingContainer.classList.add('editing');
        let editingBx = document.querySelector('.editBx');
        editingBx.style.visibility = 'visible';
        let editTitle = document.querySelector('#titleBxEdit');
        let editNote = document.querySelector('#noteBxEdit');
        editTitle.value = box.childNodes[0].innerHTML;
        editNote.value = box.childNodes[1].innerHTML;

        // on save button 
        let editSaveBtn = document.querySelector('#editSubmitEdit');
        editSaveBtn.onclick = () => {
            if(editTitle.value !== ''){
                box.childNodes[0].innerHTML = editTitle.value;
            }else{
                box.childNodes[0].innerHTML = 'Title';
            }

            if(editNote.value !== ''){
                box.childNodes[1].innerHTML = editNote.value;
            }
            else{
                box.childNodes[1].innerHTML = 'Take a note...';
            }
            closeEditBx(editingContainer,editingBx);  
        }

        // on close button
        document.querySelector('#editCloseEdit').onclick = () => {
            closeEditBx(editingContainer,editingBx);  
        }
    
}


//  close Edit & reading Box 
let closeEditBx = (editingContainer,editingBx) => {
        editingContainer.classList.remove('editing');   
        editingBx.style.visibility = 'hidden';
}


