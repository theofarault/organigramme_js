let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.getElementById('card')
var handles = document.querySelectorAll('.resize-handle');
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


    handles.forEach(function (handle) {
        handle.addEventListener('mousedown', function (e) {
            isResizing = true;
            currentHandle = handle;
            document.addEventListener('mousemove', resizeCard);
            document.addEventListener('mouseup', stopResizing);
        });
    });

    function resizeCard(e) {
        console.log("resize")
        if (!isResizing) return;
        var rect = card.getBoundingClientRect();

        console.log(rect)

        if (currentHandle.classList.contains('bottom-right')) {
            card.style.width = e.clientX - rect.left + 'px';
            card.style.height = e.clientY - rect.top + 'px';
        } else if (currentHandle.classList.contains('bottom-left')) {
            card.style.width = rect.right - e.clientX + 'px';
            card.style.height = e.clientY - rect.top + 'px';
            card.style.left = e.clientX + 'px';
        } else if (currentHandle.classList.contains('top-right')) {
            card.style.width = e.clientX - rect.left + 'px';
            card.style.height = rect.bottom - e.clientY + 'px';
            card.style.top = e.clientY + 'px';
        } else if (currentHandle.classList.contains('top-left')) {
            card.style.width = rect.right - e.clientX + 'px';
            card.style.height = rect.bottom - e.clientY + 'px';
            card.style.top = e.clientY + 'px';
            card.style.left = e.clientX + 'px';
        }
    }

    function stopResizing() {
        console.log("stop resize")
        isResizing = false;
        currentHandle = null;
        document.removeEventListener('mousemove', resizeCard);
        document.removeEventListener('mouseup', stopResizing);
    }