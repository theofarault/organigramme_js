let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.getElementById('card')
var isResizing = false;
var currentHandle = null;


card.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e){
    if (!isResizing){


    newX = startX - e.clientX
    newY = startY - e.clientY

    startX = e.clientX
    startY = e.clientY

    card.style.top = (card.offsetTop - newY) + 'px'
    card.style.left = (card.offsetLeft - newX) + 'px'
    }
    return
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}


// Création des poignées de redimensionnement
const handles = ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'left', 'right', 'top', 'bottom'];
handles.forEach(handle => {
  const div = document.createElement('div');
  div.className = 'resize-handle ' + handle;
  card.appendChild(div);
  div.addEventListener('mousedown', initResize, false);
});

let startWidth, startHeight;

function initResize(e) {
    isResizing = true;
  e.preventDefault();
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(card).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(card).height, 10);
  document.documentElement.addEventListener('mousemove', doResize, false);
  document.documentElement.addEventListener('mouseup', stopResize, false);
}

function doResize(e) {
  if (e.target.classList.contains('top-left')) {
    card.style.width = (startWidth - e.clientX + startX) + 'px';
    card.style.height = (startHeight - e.clientY + startY) + 'px';
    card.style.left = (parseInt(card.style.left) + e.clientX - startX) + 'px';
    card.style.top = (parseInt(card.style.top) + e.clientY - startY) + 'px';
  } else if (e.target.classList.contains('top-right')) {
    card.style.width = (startWidth + e.clientX - startX) + 'px';
    card.style.height = (startHeight - e.clientY + startY) + 'px';
    card.style.top = (parseInt(card.style.top) + e.clientY - startY) + 'px';
  } else if (e.target.classList.contains('bottom-left')) {
    card.style.width = (startWidth - e.clientX + startX) + 'px';
    card.style.height = (startHeight + e.clientY - startY) + 'px';
    card.style.left = (parseInt(card.style.left) + e.clientX - startX) + 'px';
  } else if (e.target.classList.contains('bottom-right')) {
    card.style.width = (startWidth + e.clientX - startX) + 'px';
    card.style.height = (startHeight + e.clientY - startY) + 'px';
  } else if (e.target.classList.contains('left')) {
    card.style.width = (startWidth - e.clientX + startX) + 'px';
    card.style.left = (parseInt(card.style.left) + e.clientX - startX) + 'px';
  } else if (e.target.classList.contains('right')) {
    card.style.width = (startWidth + e.clientX - startX) + 'px';
  } else if (e.target.classList.contains('top')) {
    card.style.height = (startHeight - e.clientY + startY) + 'px';
    card.style.top = (parseInt(card.style.top) + e.clientY - startY) + 'px';
  } else if (e.target.classList.contains('bottom')) {
    card.style.height = (startHeight + e.clientY - startY) + 'px';
  }
}

function stopResize() {
    isResizing = false;
  document.documentElement.removeEventListener('mousemove', doResize, false);
  document.documentElement.removeEventListener('mouseup', stopResize, false);
}

    // handles.forEach(function (handle) {
    //     handle.addEventListener('mousedown', function (e) {
    //         isResizing = true;
    //         currentHandle = handle;
    //         document.addEventListener('mousemove', resizeCard);
    //         document.addEventListener('mouseup', stopResizing);
    //     });
    // });

    // function resizeCard(e) {
    //     console.log("resize")
    //     if (!isResizing) return;
    //     var rect = card.getBoundingClientRect();

    //     console.log(rect)

    //     if (currentHandle.classList.contains('bottom-right')) {
    //         card.style.width = e.clientX - rect.left + 'px';
    //         card.style.height = e.clientY - rect.top + 'px';
    //     } else if (currentHandle.classList.contains('bottom-left')) {
    //         card.style.width = rect.right - e.clientX + 'px';
    //         card.style.height = e.clientY - rect.top + 'px';
    //         card.style.left = e.clientX + 'px';
    //     } else if (currentHandle.classList.contains('top-right')) {
    //         card.style.width = e.clientX - rect.left + 'px';
    //         card.style.height = rect.bottom - e.clientY + 'px';
    //         card.style.top = e.clientY + 'px';
    //     } else if (currentHandle.classList.contains('top-left')) {
    //         card.style.width = rect.right - e.clientX + 'px';
    //         card.style.height = rect.bottom - e.clientY + 'px';
    //         card.style.top = e.clientY + 'px';
    //         card.style.left = e.clientX + 'px';
    //     }
    // }

    // function stopResizing() {
    //     console.log("stop resize")
    //     isResizing = false;
    //     currentHandle = null;
    //     document.removeEventListener('mousemove', resizeCard);
    //     document.removeEventListener('mouseup', stopResizing);
    // }