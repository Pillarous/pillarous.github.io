dateColor = "#597e85";
faceColor = "#45ada8";
secondsHandColor = "#e5fcc2";
minutesHandColor = "#9de0ad";
hoursHandColor = "#9de0ad";
del = 0.6;
ref = 20;
var ieType = (typeof window.innerWidth != "number");
var docComp = (document.compatMode);
var docMod = (docComp && docComp.indexOf("CSS") != -1);
var ieRef = (ieType && docMod) ? document.documentElement : document.body;
theDays = new Array("SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY");
theMonths = new Array("JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER");
date = new Date();
day = date.getDate();
year = date.getYear();
if (year < 2000) year = year + 1900; 
tmpdate = " " + theDays[date.getDay()] + " " + theMonths[date.getMonth()] + " " + day + " " + year;
D = tmpdate.split("");
N = "3 4 5 6 7 8 9 10 11 12 1 2"
N = N.split(" ");
F = N.length;
H = "...";
H = H.split("");
M = "....";
M = M.split("");
S = ".....";
S = S.split("");
siz = 40;
eqf = 360 / F;
eqd = 360 / D.length;
han = siz / 5.5;
ofy = -7;
ofx = -3;
ofst = 70;
tmr = null;
mouseY = 0;
mouseX = 0;
dy = new Array();
dx = new Array();
zy = new Array();
zx = new Array();
tmps = new Array();
tmpm = new Array(); 
tmph = new Array();
tmpf = new Array(); 
tmpd = new Array();
var sum = parseInt(D.length + F + H.length + M.length + S.length) + 1;
for (i = 0; i < sum; i++) {
    dy[i] = 0;
    dx[i] = 0;
    zy[i] = 0;
    zx[i] = 0;
}
algn = new Array();
for (i = 0; i < D.length; i++) {
    algn[i] = (parseInt(D[i]) || D[i] == 0) ? 10 : 9;
    document.write('<div id="_date' + i + '" class="css2" style="font-size:' + algn[i] + 'px;color:' + dateColor + '">' + D[i] + '<\/div>');
    tmpd[i] = document.getElementById("_date" + i).style;
}
for (i = 0; i < F; i++) {
    document.write('<div id="_face' + i + '" class="css2" style="color:' + faceColor +'">' + N[i] + '<\/div>');
    tmpf[i] = document.getElementById("_face" + i).style; 
}
for (i = 0; i < H.length; i++) {
    document.write('<div id="_hours' + i + '" class="css1" style="color:' + hoursHandColor + '">' + H[i] + '<\/div>');
    tmph[i]=document.getElementById("_hours" + i).style;
}
for (i = 0; i < M.length; i++) {
    document.write('<div id="_minutes'+i+'" class="css1" style="color:' + minutesHandColor + '">' + M[i] + '<\/div>');
    tmpm[i] = document.getElementById("_minutes" + i).style; 
}
for (i = 0; i < S.length; i++) {
    document.write('<div id="_seconds' + i + '" class="css1" style="color:' + secondsHandColor + '">' + S[i] + '<\/div>');
    tmps[i] = document.getElementById("_seconds" + i).style;
}

function mouse(e) {
    var msy = (!ieType) ? window.pageYOffset:0;
    if (!e) e = window.event;    
    if (typeof e.pageY == 'number') {
        mouseY = e.pageY + ofst - msy;
        mouseX = e.pageX + ofst;
    } else {
        mouseY = e.clientY + ofst - msy;
        mouseX = e.clientX + ofst;
    }
}

document.onmousemove = mouse;

function winDims() {
    winH = (ieType) ? ieRef.clientHeight:window.innerHeight; 
    winW = (ieType) ? ieRef.clientWidth:window.innerWidth;
}

winDims();
window.onresize = new Function("winDims()");

function ClockAndAssign() {
    time = new Date();
    secs = time.getSeconds();
    sec = Math.PI * (secs - 15) / 30;
    mins = time.getMinutes();
    min = Math.PI * (mins - 15) / 30;
    hrs = time.getHours();
    hr = Math.PI * (hrs - 3) / 6 + Math.PI * parseInt(time.getMinutes()) / 360;
    for (i = 0; i < S.length; i++){
        tmps[i].top = dy[D.length + F + H.length + M.length + i] + ofy + (i * han) * Math.sin(sec) + scrollY + "px";
        tmps[i].left = dx[D.length + F + H.length + M.length + i] + ofx + (i * han) * Math.cos(sec) + "px";
    }
    for (i = 0; i < M.length; i++) {
        tmpm[i].top = dy[D.length + F + H.length + i] + ofy + (i * han) * Math.sin(min) + scrollY + "px";
        tmpm[i].left = dx[D.length + F + H.length + i] + ofx + (i * han) * Math.cos(min) + "px";
    }
    for (i = 0; i < H.length; i++) {
        tmph[i].top = dy[D.length + F + i] + ofy + (i * han) * Math.sin(hr) + scrollY + "px";
        tmph[i].left = dx[D.length + F + i] + ofx + (i * han) * Math.cos(hr) + "px";
    }
    for (i = 0; i < F; i++) {
        tmpf[i].top = dy[D.length + i] + siz * Math.sin(i * eqf * Math.PI / 180) + scrollY + "px";
        tmpf[i].left = dx[D.length + i] + siz * Math.cos(i * eqf * Math.PI / 180) + "px";
    }
    for (i=0; i < D.length; i++){
        tmpd[i].top = dy[i] + siz * 1.5 * Math.sin(-sec + i * eqd * Math.PI / 180) + scrollY + "px";
        tmpd[i].left = dx[i] + siz * 1.5 * Math.cos(-sec + i * eqd * Math.PI / 180) + "px";
    }
}

buffW = (ieType) ? 80 : 90;

function Delay() {
    scrollY = (ieType) ? ieRef.scrollTop : window.pageYOffset;
    zy[0] = Math.round(dy[0] += ((mouseY) - dy[0]) * del);
    zx[0] = Math.round(dx[0] += ((mouseX) - dx[0]) * del);
    for (i = 1; i < sum; i++) {
        zy[i] = Math.round(dy[i] += (zy[i - 1] - dy[i]) * del);
        zx[i] = Math.round(dx[i] += (zx[i - 1] - dx[i]) * del);
        if (dy[i-1] >= winH - 80) {
            dy[i-1] = winH - 80;
        }
        if (dx[i-1] >= winW - buffW) {
            dx[i-1] = winW - buffW;
        }
    }
    tmr = setTimeout('Delay()', ref);
    ClockAndAssign();
}

window.onload = Delay;
