const grid = $('.grid')

// const links = JSON.parse(localStorage.links || '[]')
const links = [
    {
        title: '我的電腦',
        url: 'http://192.168.1.109',
        icon: 'ion-ios7-monitor'
    },
    {
        title: 'Google',
        url: 'https://www.google.com',
        icon: 'ion-ios7-world'
    }
]

class Item {
    constructor(data) {
        this.title = data.title || ''
        this.url = data.url || ''
        this.icon = data.icon || ''
    }
}

for (let i = 0; i < 15; ++i) {
    if (i < links.length) {
        const item = links[i]
        $('.grid').append(`
            <a class="item item_" href=${item.url}>
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
                <section class="info">
                    <ol><li>${item.url}</li></ol>
                </section>
            </a>
        `)
    } else {
        if (i == links.length) {
            $('.grid').append(`
                <div class="item" style="cursor: pointer;" onclick="add()">
                    <i class="ion-android-add"></i>
                    <span>新增連結</span>
                </div>
            `)
        } else {
            $('.grid').append(`<div class="item"></div>`)
        }
    }
}

function add() {
    swal.fire({
        title: '新增連結',
        html: `
            <input id="title" class="swal2-input" placeholder="標題">
            <input id="url" class="swal2-input" placeholder="URL">
            <input id="icon" class="swal2-input" placeholder="圖示" value="ion-ios7-world">
        `,
        preConfirm: function () {
            return new Promise((resolve) => {
                resolve({
                    title: $('#title').val(),
                    url: $('#url').val(),
                    icon: $('#icon').val(),
                })
            })
        },
        onOpen: function () {
            $('#title').focus()
        }
    }).then(({ value }) => {
        links.push(new Item(value))
        localStorage.links = JSON.stringify(links)
        location.reload()
    }).catch(swal.noop)
}