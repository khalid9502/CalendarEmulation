
Date.prototype.getMonthName = function () {
    var m = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    return m[this.getMonth()];
}
Date.prototype.getDayName = function () {
    var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'];
    return d[this.getDay()];
}
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}


var deb ;
var canvasBody , ctxBody ,canvasHeader, cxtHeader ;
var lastIndex = -1;
var totalDays ;
var thisYear = 2014;
var thisMonth = 6;
var bodyCells = [];
var headerCells = [];
var colomnCells = [];

function Cell(text, color) {
    this.text = text || ""
    this.color = color || 'gray'
}




$(document).ready(function () {
    
    deb = document.getElementById('debugger');
    canvasBody = document.getElementById('cvsbody');
    ctxBody = canvasBody.getContext('2d');
    canvasHeader = document.getElementById('cvsheader');
    cxtHeader = canvasHeader.getContext('2d');

    var dt = new Date(thisYear, thisMonth, 1);

    deb.innerHTML = 'days in month' + daysInMonth(dt.getMonth() + 1, dt.getYear())  ;
    totalDays = daysInMonth(dt.getMonth() + 1, dt.getYear());
    

    cxtHeader.fillStyle = 'grey';
    cxtHeader.fillRect(0, 0, canvasHeader.width, canvasHeader.height);

    cxtHeader.fillStyle = 'green';
    cxtHeader.fillRect(5, 3, 150, 28);
    cxtHeader.font = '15pt Calibri';
    cxtHeader.fillStyle = 'white';
    cxtHeader.fillText("Car Name ", 5, 20);

    drawHeaderRow(cxtHeader);
    // do cool things with the ctxBody
    ctxBody.fillStyle = 'grey';
    ctxBody.fillRect(0, 0, canvasBody.width, canvasBody.height);
    var carNo;
    for (j = 0; j < totalDays; j++) {
        ctxBody.fillStyle = 'green';
        ctxBody.fillRect(5, j * (28 + 3), 150, 28);
        ctxBody.font = '15pt Calibri';
        ctxBody.fillStyle = 'white';
        carNo = "car  " + (j + 1).toString() ;
        ctxBody.fillText(carNo, 3, j * (28 + 3) + 20);
        cell = new Cell(carNo)
        colomnCells.push(cell);
        drawTableRow(ctxBody, j);
    }   

});

function drawHeaderRow(ctx) {
    
    for (i = 1; i <= totalDays; i++) {
        date = new Date(thisYear, thisMonth, i );
        theDay = date.getDayName().toString().substring(0, 2);
        ctx.font = '15pt Calibri';
        if (date.getDay() == 0 || date.getDay() == 6) {
            ctx.fillStyle = 'yellow';
            rColor = 'yellow';
        } else {
            ctx.fillStyle = 'red';
            rColor = 'red';
        }
        ctx.fillRect((i - 1) * (28 + 3) + 160, 3, 28, 28);
        ctx.fillStyle = 'blue';
        ctx.fillText(theDay, 160 + (i - 1) * (28 + 3) + 2, (20 + 3));
        cell = new Cell(theDay, rColor);
       // cell.normalColor = 'gray';
        headerCells.push(cell);
  
    }
}

function drawTableRow(ctx, rowNumber) {
    var text;
    var rColor;
    for (i = 0; i < totalDays; i++) {
        date = new Date(thisYear, thisMonth, i+1);
        theDay = date.getDayName().toString().substring(0, 2);
       
        if (date.getDay() == 0 || date.getDay() == 6) {
            ctx.fillStyle = 'yellow';
            rColor = 'yellow';
        } else {
            ctx.fillStyle = 'red';
            rColor = 'red';
        }
        ctx.fillRect(160 + i * (28 + 3), rowNumber * (28 + 3), 28, 28);
        ctx.fillStyle = 'blue';
        //text = Math.floor((Math.random() * totalDays) + 1);
        text = Math.floor(rowNumber * totalDays + i);
        ctx.font = '10pt Calibri';
        ctx.fillText(text, 160 + i * (28 + 3) + 2, rowNumber * (28 + 3) + 20);

        cell = new Cell(text, rColor);
        bodyCells.push(cell);
    }
}

function findIndex(event) {
    var stage = canvasBody.getBoundingClientRect();
    mouseX = Math.floor(event.clientX - stage.left);
    mouseY = Math.floor(event.clientY - stage.top);
    var theday;
    var rtext;
    var thecar;
    var rColor;


    if (lastIndex > -1) {

        j = Math.floor((lastIndex - 1) / totalDays);
        i = Math.floor((lastIndex - 1) % totalDays);
        rColor = bodyCells[lastIndex - 1].color;
        rtext = bodyCells[lastIndex - 1].text;

        deb.innerHTML = 'j:' + j + ',i:' + i + 'lastindex:' + lastIndex + 'text  :' + rtext;

        if (rColor == 'yellow') {
            ctxBody.fillStyle = 'yellow';
            ctxBody.fillRect(160 + i * (28 + 3) , j * (28 + 3), 28, 28);
        } else {
            ctxBody.fillStyle = 'red';
            ctxBody.fillRect(160 + i * (28 + 3) , j * (28 + 3), 28, 28);
        }
        ctxBody.font = '8pt Calibri';
        ctxBody.fillStyle = 'blue';
        ctxBody.fillText(rtext, 160 + i * (28 + 3) , j * (28 + 3) + 20);

        thecar = colomnCells[j].text;
        ctxBody.fillStyle = 'green';
        ctxBody.fillRect(3, j * (28 + 3), 150, 28);
        ctxBody.font = '15pt Calibri';
        ctxBody.fillStyle = 'white';
        ctxBody.fillText(thecar, 3, j * (28 + 3) + 20);

        rColor = headerCells[i].color;
        theday = headerCells[i].text;
        if (rColor == 'yellow') {
            cxtHeader.fillStyle = 'yellow';
            cxtHeader.fillRect(160 + i * (28 + 3) , 3, 28, 28);
        } else {
            cxtHeader.fillStyle = 'red';
            cxtHeader.fillRect(160 + i * (28 + 3) , 3, 28, 28);
        }
        cxtHeader.font = '15pt Calibri';
        cxtHeader.fillStyle = 'blue';
        cxtHeader.fillText(theday, 160 + i * (28 + 3) , 20);

    }
   


    row = Math.floor(mouseY / (28 + 3)) + 1;
    col = Math.floor((mouseX - (160 + 3)) / 31) + 1;


    if (col >= 1) {

        ctxBody.fillStyle = 'black';
        ctxBody.fillRect(160 + ((col - 1) * (28 + 3)), (row - 1) * (28 + 3), 28, 28);
        ctxBody.font = '15pt Calibri';
        ctxBody.fillStyle = 'white';

        ctxBody.fillStyle = 'black';
        ctxBody.fillRect(3, (row - 1) * (28 + 3), 150, 28);
        ctxBody.font = '15pt Calibri';
        ctxBody.fillStyle = 'white';

        cxtHeader.fillStyle = 'black';
        cxtHeader.fillRect(160 + ((col - 1) * (28 + 3)), 3, 28, 28);
        cxtHeader.font = '15pt Calibri';
        cxtHeader.fillStyle = 'white';

        lastIndex = (row - 1) * totalDays + col;

        text = bodyCells[lastIndex - 1].text;
        thecar = colomnCells[row - 1].text;
        theday = headerCells[col - 1].text;

        ctxBody.fillText(text, 160 + ((col - 1) * (28 + 3)), (row - 1) * (28 + 3) + 20);
        ctxBody.fillText(thecar, 3, (row - 1) * (28 + 3) + 20);
        cxtHeader.fillText(theday, 160 + ((col - 1) * (28 + 3) + 2), 20);
    }

}


       
