var readlineSync = require('readline-sync');
var fs = require('fs');
var dataContact = []

function findContact(array, name) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name.toUpperCase() == name) return i;
    }
    return -1;
}

function showListContact(array) {

    if (array.length === 0) console.log('\n\t\t\tList contact is empty');
    else {
        array.forEach(element => {
            console.log('\tName : ' + element.name + '\t-- Phone number : ' + element.number);
        });
    }
}


function showMenu() {
    console.log('\n\t\t======== MENU ========');
    console.log('1. Show list contact');
    console.log('2. Creat new a contact');
    console.log('3. Edit a contact');
    console.log('4. Delete a contact');
    console.log('5. Find contact');
    console.log('6. Save');
    console.log('0. Exit');
    var option = readlineSync.question('Choice : ');
    option = parseInt(option);
    switch (option) {
        case 1:
            console.log('\n\t\t======== List contact ========');
            showListContact(dataContact);
            showMenu();
            break;
        case 2:
            var contact = {};
            contact.name = readlineSync.question('Name : ');
            contact.number = readlineSync.question('Phone number : ');
            dataContact.push(contact);
            showMenu();
            break;
        case 3:
            var contactEdit = readlineSync.question('=>The contact name you want to edit : ');
            var pos = findContact(dataContact, contactEdit.toUpperCase());
            if (pos === -1) console.log('==> Contact doesn\'t exist');
            else {
                console.log('*Info contact old');
                console.log('\tName : ' + dataContact[pos].name + '\t-- Phone number : ' + dataContact[pos].number);
                console.log('*Edit contact');
                dataContact[pos].name = readlineSync.question('Name : ');
                dataContact[pos].number = readlineSync.question('Phone number : ');
            }
            showMenu();
            break;
        case 4:
            var contactDelete = readlineSync.question('=>The contact name you want to delete : ');
            var pos = findContact(dataContact, contactDelete.toUpperCase());
            if (pos === -1) console.log('\n==>Contact doesn\'t exist');
            else {
                dataContact.splice(pos, 1);
                console.log('\n==>Done!');
            }
            showMenu();
            break;
        case 5:
            var contactFind = readlineSync.question('=>The contact name you want to find : ');
            var pos = findContact(dataContact, contactFind.toUpperCase());
            if (pos === -1) console.log('\n==>Contact doesn\'t exist');
            else {
                console.log('\tName : ' + dataContact[pos].name + '\t-- Phone number : ' + dataContact[pos].number);
            }
            showMenu();
            break;
        case 6:
            fs.writeFileSync('./data.json', JSON.stringify(dataContact));

            showMenu();
            break;
        case 0:
            break;
        default:
            console.log('Wrong option!');
            showMenu();
            break;
    }
}


function main() {

    var dataString = fs.readFileSync('./data.json', { encoding: 'utf8' });
    dataContact = JSON.parse(dataString);
    showMenu()

}

main();