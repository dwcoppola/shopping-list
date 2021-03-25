function pullListFromStorage() {
    var stockArray = localStorage['list'].split(",");
    return stockArray.slice(0, stockArray.length - 1);
}

function localStorageCheck() {
    if (localStorage['history'] === undefined) {
        localStorage['history'] = '';
    }
    if (localStorage['checked'] === undefined) {
        localStorage['checked'] = '';
    } 
    if (localStorage['list'] === undefined) {
        localStorage['list'] = '';
    } else {
        return pullListFromStorage();
    }
}

function addToList() {
    var item = document.getElementById('new-item-input').value;
    var item = item.replaceAll(",", " ").trim();
    if (localStorage['list'].split(',').includes(item.toLowerCase())) {
        alert("That's already in your list");
        location.reload();
    } else {
        localStorage['list'] += item.toLowerCase() + ",";
        localStorage['checked'] += (item.toLowerCase() + "," + '0,');
        caption = `Added ${item.toLowerCase()}`;
        localStorage['history'] = caption.toLowerCase();
        location.reload();  
    }
}

function removeFromStock(item) {
    deleteItem = item + ',';
    localStorage['list'] = localStorage['list'].replace(deleteItem, '');
    if (localStorage['checked'].includes(deleteItem + '0,')) {
        localStorage['checked'] = localStorage['checked'].replace(deleteItem + '0,', '');
    } else {
        localStorage['checked'] = localStorage['checked'].replace(deleteItem + '1,', '');
    }
    caption = `Removed ${initialCaps(item)}`;
    localStorage['history'] = caption.toLowerCase();
    location.reload();
}

function addElement(
    parent, child, content, 
    attribute1=null, attibuteValue1=null, 
    attribute2=null, attributeValue2=null, 
    attribute3=null, attributeValue3=null,
    ) {
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

function initialCaps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeStockList(list) {
    addElement('#table-container', 'table', '', 'id', 'stock-list');
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
        localStorage['checked'].includes(`${list[item].toLowerCase()},1`) ? checkbox.checked = true : checkbox.checked = false;
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

function listenForCheck(checkBoxID) {
    checkbox = document.getElementById(`checkbox-${checkBoxID}`);
    checkedItem = document.getElementById(`list-item-${checkBoxID}`).textContent.toLowerCase();
    if (checkbox.checked === true) {
        localStorage['checked'] = localStorage['checked'].replace(checkedItem + ',0', checkedItem + ',1');
        localStorage['history'] = `checked ${checkedItem}`;
        location.reload();
    } else {
        localStorage['checked'] = localStorage['checked'].replace(checkedItem + ',1', checkedItem + ',0');
        localStorage['history'] = `unchecked ${checkedItem}`;
        location.reload();
    }
}

function listenForEnter(event) {
    var listen = event.which || event.keyCode;
    if (listen === 13) {
        addToList();
    } else {
    };
}

function focusOnElement(elementID) {
    var e = document.getElementById(elementID);
    e.focus();
}

function buildOrRebuildPage() {
    localStorageCheck();
    addElement(
        'body', 'h2', 'Shopping List');

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
        addElement('#caption-container', 'p', initialCaps(localStorage['history']), 'id', 'history-caption');
    /*
    addElement('#input-controls', 'button', 'Sort', 
        'onclick', 'sortList()', 
        'id', 'sort-list-button'
        );
    */
    addElement('body', 'div', '', 'id', 'table-container');
    makeStockList(pullListFromStorage());
}

buildOrRebuildPage();