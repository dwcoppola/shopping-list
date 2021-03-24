allLocations = [];
allStock = [];

function localStorageCheck() {
    if (localStorage['allLocations'] === undefined) {
        localStorage['allLocations'] = '';
    }
    if (localStorage['allChecked'] === undefined) {
        localStorage['allChecked'] = '';
    } 
    if (localStorage['allStock'] === undefined) {
        localStorage['allStock'] = "";
    } else {
        var stockArray = localStorage['allStock'].split(",");
        allStock = stockArray.slice(0, stockArray.length - 1);
    }
}

function addToStock() {
    var item = document.getElementById('new-item-input').value;
    var item = item.replaceAll(",", " ").trim();
    if (allStock.includes(item.toLowerCase())) {
        alert("That's already in your list");
        location.reload();
    }
    else {
        allStock.push(item.toLowerCase());
        localStorage['allStock'] += item.toLowerCase() + ",";
        localStorage['allChecked'] += (item.toLowerCase() + "," + '0;');
        location.reload();
    }
}

function removeFromStock(item) {
    deleteItem = item + ',';
    localStorage['allStock'] = localStorage['allStock'].replace(deleteItem, '');
    if (localStorage['allChecked'].includes(deleteItem + '0,')) {
        localStorage['allChecked'] = localStorage['allChecked'].replace(deleteItem + '0,', '');
    } else {
        localStorage['allChecked'] = localStorage['allChecked'].replace(deleteItem + '1,', '');
    }
    location.reload();
}

function List(name) {
    this.name = name;
    this.items = [];
    this.add = function(items) {
        for (i in items) {
            this.items.push(items[i]);
        }
    }
}

function addElement(
    parent, child, content, 
        attribute1=null, attibuteValue1=null, 
            attribute2=null, attributeValue2=null, 
                attribute3=null, attributeValue3=null,) 
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

function initialCaps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeStockList() {
    addElement('#table-container', 'table', '', 'id', 'stock-list');
    addElement('table', 'tr', '', 'id', 'top-row');
    addElement('#top-row', 'th');
    addElement('#top-row', 'th');
    addElement('#top-row', 'th');
    
    for (item in allStock) {
        addElement('table', 'tr', '', 'id', `row-${item}`);

            addElement(`#row-${item}`, 'td', `${initialCaps(allStock[item])}`, 'id', `list-item-${item}`, 'class', 'list-item-td');
            addElement(`#row-${item}`, 'td', '', 'id', `check-box-home-${item}`, 'class', 'checkbox-td');

            addElement(`#check-box-home-${item}`, 'input', '', 'type', 'checkbox', 'onclick', `listenForCheck(${item})`, 'id', `checkbox-${item}`);
                addElement(`#row-${item}`, 'td', '', 'id', `delete-button-home-${item}`, 
                    'onclick', `removeFromStock("${allStock[item]}")`, 'class', 'delete-stock-button'
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
        localStorage['allChecked'] = localStorage['allChecked'].replace(checkedItem + ',0', checkedItem + ',1');
    } else {
        localStorage['allChecked'] = localStorage['allChecked'].replace(checkedItem + ',1', checkedItem + ',0');
    }
}

function listenForEnter(event) {
    var listen = event.which || event.keyCode;
    if (listen === 13) {
        addToStock()
    } else {
    };
}

function focusOnElement(elementID) {
    var e = document.getElementById(elementID);
    e.focus();
}

localStorageCheck();
addElement(
    'body', 'h2', 'Shopping List');
addElement(
    'body', 'div', '', 'id', 'input-controls')
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
    'onclick', 'addToStock()', 
    'id', 'add-item-button'
    );
addElement('body', 'div', '', 'id', 'table-container');
makeStockList();
addElement('body', 'footer');
addElement('footer', 'p', 'This is where actions go')
