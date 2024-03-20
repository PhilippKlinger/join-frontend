function generateContactsHTML() {
    return /*html*/ `
    <div class="contactsSection" id="contactsSection">
    <div class="contactsList" id="contactsList">
    </div>
    <div class="contactsDetail" id="contactsDetail">
    <div>
        <div style="display:flex;flex-direction:column">
            <h5>Kanban Project Management Tool</h5>
                <div class="contactsDetailHead">
                    <div class="contactsDetailHeadCaption">
                        <h2>Contacts</h2>
                        <img src="./img/contactsHeadIcon.svg" alt="contactsHeadIcon">
                        <p>Better with a team</p>
                    </div>
                <img onclick="returnToContactslist()" class="contactsDetailHeadPic" src="./img/returnArrow.svg" alt="returnToListBtn">
            </div>
        </div>
        <div class="contactsDetailInfo" id="contactsDetailInfo">
        </div>
    </div>
    <div class="contactsDetailBottom">
        <div class="contactsDetailBottomBtn hideBtn" onclick="addNewContact()">
            <p>New Contact</p>
            <img src="./img/newContactIcon.svg" alt="newContactIconBig">
        </div>
    </div>
</div>
</div>
`
}

function generateContactsListMobileButton() {
    return /*html*/ `
    <div class="contactsDetailBottomBtn btnMobile" onclick="addNewContact()">
    <p>New Contact</p>
    <img src="./img/newContactIcon.svg" alt="newContactIconBig">
</div>`;
}

function generateContactsDetailContentHTML(name, email, phone, color, initials, i) {
    return /*html*/ `
        <div class="contactsDetailInfoHead">
                <h4 style="background:${color}">${initials}</h4>
                <div>
                <p class="contactsDetailInfoHeadName">${name}</p>
                <p class="contactsDetailInfoHeadAddTask" onclick="openAddTaskOverlay()">+ Add Task</p>
                </div>
            </div>
            <div class="contactsDetailInfoContent">
                <div class="contactsDetailInfoContentLeft">
                    <h3>Contact Information</h3>
                    <h4>Email</h4>
                    <p class="contactsListContactMail">${email}</p>
                    <h4>Phone</h4>
                    <p>${phone}</p>
                </div>
                <div class="contactsDetailInfoContentRight" onmouseover="btnHoverEffect2(true)" onmouseout="btnHoverEffect2(false)">
                    <div class="contactsDetailInfoContentRightEdit" onclick="editContact(${i})">
                    <img id="cancelCheckmarkContacts2" src="./img/editContactIcon.svg" style="display:block" alt="editContactIcon">
                    <img id="cancelCheckmarkContactsHover2" src="./img/editContactIconHover2.svg" style="display:none" alt="editContactIcon">
                        <h3>Edit Contact</h3>
                    </div>
                    <div class="contactsDetailBottomMobileSection">
                        <img onclick="deleteContact(${i})" class="contactsDetailBottomMobile" src="./img/editContactIconDeleteMobile.svg" alt="editContactIcon">
                        <img onclick="editContact(${i})" class="contactsDetailBottomMobile" src="./img/editContactIconMobile.svg" alt="editContactIcon">
                    </div>
                    </div>
            </div>`
}

function generateContactsListGroupHTML(groupLetter) {
    return /*html*/ `
    <div class="contactsListGroup" id="contactsListGroup${groupLetter}">
    <div class="contactsListGroupHead" id="contactsListGroupHead">
            <p>${groupLetter}</p>
        </div>   
    </div>
    `
}

function generateContactsListGroupContactHTML(name, email, color, initials, i) {
    return /*html*/ `
    <div onclick="showContactDetails(${i})" class="contactsListGroupContact contactsListGroupContactBgInactive" id="contactsListGroupContact${i}">
            <h4 style="background:${color}">${initials}</h4>
                <div>
                    <p class="contactsListContactName">${name}</p>
                    <p class="contactsListContactMail">${email}</p>
                </div>
        </div>`
}

function generateContactsOverlayAddHTML() {
    return /*html*/ `
<div class="overlayAddContact" id="overlayAddContact" onclick="doNotClose(event)">
            <div class="overlayAddContactLeft">
                <div class="overlayAddContactRightInputSectionHeadMobile">
                        <img onclick="closeContactOverlay()" src="./img/addContactOverlayCloseWhite.svg" alt="closeButton">
                    </div>
                <div class="overlayAddContactLeftContent">
                    <img class="overlayAddContactLeftContentLogo" src="./img/sidebarLogo.svg" alt="sidebarLogo">
                    <p class="overlayAddContactLeftHeadline">Add Contact</p>
                    <p class="overlayAddContactLeftCaption">Tasks are better with a team!</p>
                    <img class="overlayAddContactLeftContentLine" src="./img/addContactOverlayLine.svg"
                        alt="underline">
                </div>
            </div>
            <div class="overlayAddContactRight">
                <div class="overlayAddContactRightProfilepic">
                    <img src="./img/addContactOverlayEmptyProfile.svg" alt="ProfilePicEmpty">
                </div>
                <div class="overlayAddContactRightInputSection">
                    <div class="overlayAddContactRightInputSectionHead">
                        <img onclick="closeContactOverlay()" src="./img/addContactOverlayClose.svg" alt="closeButton">
                    </div>
                    <form onsubmit="createContact(); return false;">
                        <input id="addContactName" class="contactOverlayNameIcon" required pattern="^(?:[A-ZÄÖÜ][a-zäöüß]+ )+[A-ZÄÖÜ][a-zäöüß]+$" type="text" placeholder="Name" title="Please enter a valid name e.g.: 'John Doe' ">
                        <input id="addContactEmail" class="contactOverlayEmailIcon" required type="email" placeholder="Email" title="Please enter a valid email address e.g.: 'johndoe@dev.com' ">
                        <input id="addContactPhone" class="contactOverlayPhoneIcon" required type="number" placeholder="Phone" title="Please enter a valid phone number e.g.: '+491724485536' "> 
                        <div class="overlayAddContactRightButtonSection">
                            <button type="reset" class="contactsDetailBottomBtnAlt cancelBtn2" onmouseover="btnHoverEffect(true)" onmouseout="btnHoverEffect(false)">
                                <p>Cancel</p>
                                <img id="cancelCheckmarkContacts" src="./img/cancelCheckmarkContacts.svg" style ="display:block" alt="newContactIconBig">
                                <img id="cancelCheckmarkContactsHover" src="./img/cancelCheckmarkContactsHover.svg" style="display:none" alt="newContactIconBig">
                            </button > 
                            <button type="submit" class="contactsDetailBottomBtn">
                                <p>Create Contact</p>
                                <img src="./img/checkmarkContacts.svg" alt="newContactIconBig">
                            </button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>`
}

function generateContactsOverlayEditHTML(name, email, phone, color, initials, i) {
    return /*html*/ `
    <div class="overlayAddContact" id="overlayAddContact" onclick="doNotClose(event)">
            <div class="overlayAddContactLeft">
            <div class="overlayAddContactRightInputSectionHeadMobile">
                        <img onclick="closeContactOverlay()" src="./img/addContactOverlayCloseWhite.svg" alt="closeButton">
                    </div>
                <div class="overlayAddContactLeftContent">
                    <img class="overlayAddContactLeftContentLogo" src="./img/sidebarLogo.svg" alt="sidebarLogo">
                    <p class="overlayAddContactLeftHeadline">Edit Contact</p>
                    <img class="overlayAddContactLeftContentLine" src="./img/addContactOverlayLine.svg"
                        alt="underline">
                </div>
            </div>
            <div class="overlayAddContactRight">
                <div class="overlayAddContactRightProfilepic">
                    <h4 style="background:${color}">${initials}</h4>
                </div>
                <div class="overlayAddContactRightInputSection">
                <div class="overlayAddContactRightInputSectionHead">
                        <img onclick="closeContactOverlay()" src="./img/addContactOverlayClose.svg" alt="closeButton">
                    </div>
                    <form onsubmit="createEditedContact(${i}); return false;">
                        <input id="editContactName" class="contactOverlayNameIcon" required pattern="^(?:[A-ZÄÖÜ][a-zäöüß]+ )+[A-ZÄÖÜ][a-zäöüß]+$" type="text" placeholder="Name" title="Please enter a valid name e.g.: 'John Doe' " value="${name}">
                        <input id="editContactEmail" class="contactOverlayEmailIcon" required type="email" placeholder="Email" title="Please enter a valid email address e.g.: 'johndoe@dev.com' " value="${email}">
                        <input id="editContactPhone" class="contactOverlayPhoneIcon" required type="number" placeholder="Phone" title="Please enter a valid phone number e.g.: '+491724485536' " value="${phone}">
                        <div class="overlayAddContactRightButtonSection editBtn">
                            <button type="reset" class="contactsDetailBottomBtnAlt" onclick="deleteContact(${i})" onmouseover="btnHoverEffect(true)" onmouseout="btnHoverEffect(false)">
                                <p>Delete</p>
                                <img id="cancelCheckmarkContacts" src="./img/cancelCheckmarkContacts.svg" style ="display:block" alt="newContactIconBig">
                                <img id="cancelCheckmarkContactsHover" src="./img/cancelCheckmarkContactsHover.svg" style="display:none" alt="newContactIconBig">
                             </button >
                            <button type="submit" class="contactsDetailBottomBtn">
                                <p>Save Contact</p>
                                <img src="./img/checkmarkContacts.svg" alt="newContactIconBig">
                            </button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
}

function generateContactSuccessHTML() {
    return /*html*/ `<img class="overlayAddContactSuccess" src="./img/newContactSuccess.svg">`;
}
