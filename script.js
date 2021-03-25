function pullListFromStorage() 
{
    var stockArray = localStorage['shopping-list-list-dwcoppola'].split(",");
    return stockArray.slice(0, stockArray.length - 1);
}

function localStorageCheck() 
{
    if (localStorage['shopping-list-history-dwcoppola'] === undefined) {
        localStorage['shopping-list-history-dwcoppola'] = '';
    }
    if (localStorage['shopping-list-checked-dwcoppola'] === undefined) {
        localStorage['shopping-list-checked-dwcoppola'] = '';
    } 
    if (localStorage['shopping-list-list-dwcoppola'] === undefined) {
        localStorage['shopping-list-list-dwcoppola'] = '';
    } 
    if (localStorage['shopping-list-user-decision-dwcoppola'] === undefined) {
        localStorage['shopping-list-user-decision-dwcoppola'] = '';
    }
    else {
        return pullListFromStorage();
    }
}

function initialCaps(str) 
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function adjustHistoryCaption(text) 
{
    localStorage['shopping-list-history-dwcoppola'] = text.toLowerCase();
    var caption = document.querySelector('#history-caption');
    caption.innerHTML = text;
}

function removeAllChildNodes(parent) 
{
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function buildTable(list) 
{
    table = document.querySelector('table');
    removeAllChildNodes(table);
    addElement('table', 'tr', '', 'id', 'top-row');
    addElement('#top-row', 'th');
    addElement('#top-row', 'th');
    addElement('#top-row', 'th');
    for (item in list) {
        addElement('table', 'tr', '', 'id', `row-${item}`);
        addElement(
            `#row-${item}`, 'td', `${initialCaps(list[item])}`, 
            'id', `list-item-${item}`, 
            'class', 'list-item-td'
        );
        addElement(
            `#row-${item}`, 'td', '', 
            'id', `check-box-home-${item}`, 
            'class', 'checkbox-td'
        );
        addElement(
            `#check-box-home-${item}`, 'input', '', 
            'type', 'checkbox', 
            'onclick', `listenForCheck(${item})`, 
            'id', `checkbox-${item}`
        );
        var checkbox = document.getElementById(`checkbox-${item}`);
        localStorage['shopping-list-checked-dwcoppola'].includes(`${list[item].toLowerCase()},1`) ? 
            checkbox.checked = true : checkbox.checked = false;
        addElement(
            `#row-${item}`, 'td', '', 
            'class', 'delete-button', 
            'onclick', `removeFromStock("${list[item]}")`, 
            'class', 'delete-stock-button'
        );
        var buttons = document.querySelectorAll('.delete-stock-button');
        for (i in buttons) {
            buttons[i].innerHTML = "&#9949";
        };
    }
}

function addToList() 
{
    var item = document.getElementById('new-item-input').value;
    item = item.replaceAll(",", " ").trim();
    item = item.toLowerCase();
    if (localStorage['shopping-list-list-dwcoppola'].split(',').includes(item)) {
        alert("That's already in your list");
    } else {
        localStorage['shopping-list-list-dwcoppola'] += item + ",";
        localStorage['shopping-list-checked-dwcoppola'] += (item + "," + '0,');
        adjustHistoryCaption(`Added ${initialCaps(item)}`);
        buildTable(pullListFromStorage());
        var clearItem = document.getElementById('new-item-input')
        clearItem.value = '';
        focusOnElement('new-item-input');
    }
}

function removeFromStock(item) 
{
    var deleteItem = item + ',';
    localStorage['shopping-list-list-dwcoppola'] = localStorage['shopping-list-list-dwcoppola'].replace(deleteItem, '');
    if (localStorage['shopping-list-checked-dwcoppola'].includes(deleteItem + '0,')) {
        localStorage['shopping-list-checked-dwcoppola'] = localStorage['shopping-list-checked-dwcoppola'].replace(deleteItem + '0,', '');
    } else {
        localStorage['shopping-list-checked-dwcoppola'] = localStorage['shopping-list-checked-dwcoppola'].replace(deleteItem + '1,', '');
    }
    adjustHistoryCaption(`Removed ${initialCaps(item)}`);
    buildTable(pullListFromStorage());
    focusOnElement('new-item-input');
}

function addElement(parent, child, content, 
                        attribute1=null, attibuteValue1=null, 
                            attribute2=null, attributeValue2=null, 
                                attribute3=null, attributeValue3=null) 
{
        var parent = document.querySelector(parent);
        var child = document.createElement(child);
        parent.appendChild(child);
        child.textContent = content;
        if (attribute1 !== null && attibuteValue1 !== null) {
            child.setAttribute(attribute1, attibuteValue1);
        };
        if (attribute2 !== null && attributeValue2 !== null) {
            child.setAttribute(attribute2, attributeValue2);
        };
        if (attribute3 !== null && attributeValue3 !== null) {
            child.setAttribute(attribute3, attributeValue3);
        };
}

function makeShoppingList(list) {
    addElement('#table-container', 'table', '', 'id', 'stock-list');
    buildTable(list);
}

function focusOnElement(elementID) {
    var e = document.getElementById(elementID);
    e.focus();
}

function listenForCheck(checkBoxID) {
    var checkbox = document.getElementById(`checkbox-${checkBoxID}`);
    var checkedItem = document.getElementById(`list-item-${checkBoxID}`).textContent.toLowerCase();
    if (checkbox.checked === true) {
        localStorage['shopping-list-checked-dwcoppola'] = localStorage['shopping-list-checked-dwcoppola'].replace(checkedItem + ',0', checkedItem + ',1');
        adjustHistoryCaption(`Checked ${initialCaps(checkedItem)}`)
    } else {
        localStorage['shopping-list-checked-dwcoppola'] = localStorage['shopping-list-checked-dwcoppola'].replace(checkedItem + ',1', checkedItem + ',0');
        adjustHistoryCaption(`Unchecked ${initialCaps(checkedItem)}`)
    }
}

function listenForEnter(event) {
    var listen = event.which || event.keyCode;
    if (listen === 13) {
        addToList();
    } else {
    };
}

function userDecisionCheck() {
    if (localStorage['shopping-list-user-decision-dwcoppola'] === '0') {
        localStorage.removeItem('shopping-list-history-dwcoppola');
        localStorage.removeItem('shopping-list-checked-dwcoppola');
        localStorage.removeItem('shopping-list-list-dwcoppola');
        localStorage.removeItem('shopping-list-user-decision-dwcoppola');
    }
}

function welcome() {
    if (localStorage['shopping-list-user-decision-dwcoppola'] === '') {
        confirmation = confirm(`Selecting 'OK' will allow the use of local storage and will automatically save your progress. If you don't want to use the auto save feature SELECT CANCEL and any storage used during your session will be deleted once you're finished.`);
        if (confirmation === false) {
            localStorage['shopping-list-user-decision-dwcoppola'] = '0';
        } else {
            localStorage['shopping-list-user-decision-dwcoppola'] = '1';
        }
    }
}

// The app

function buildPage() 
{
    localStorageCheck();
    welcome();
    {
        var body = document.querySelector('body');
        body.setAttribute('onbeforeunload', 'userDecisionCheck()')
    }
    addElement(
        'body', 'h2', 'Shopping List'
    );
    addElement(
        'body', 'div', '', 'id', 'input-controls');
    addElement('#input-controls', 'input', '', 
        'placeholder', 'Name of New Item', 
        'id', 'new-item-input', 
        'onkeydown', 'listenForEnter(event)'
    );
    {
        var input = document.getElementById('new-item-input');
        input.setAttribute('maxlength', '15');
    }
    focusOnElement('new-item-input');
    addElement('#input-controls', 'button', 'Add', 
        'onclick', 'addToList()', 
        'id', 'add-item-button'
    );
    addElement('body', 'div', '', 'id', 'caption-container');
    addElement(
        '#caption-container', 'p', initialCaps(localStorage['shopping-list-history-dwcoppola']), 
        'id', 'history-caption'
    );
    addElement('body', 'div', '', 'id', 'table-container');
    makeShoppingList(pullListFromStorage());
}

// Run the app

buildPage();