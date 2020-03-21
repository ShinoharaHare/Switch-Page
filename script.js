const grid = $('.grid')

// const links = JSON.parse(localStorage.links || '[]')
const links = [
    {
        title: '我的電腦',
        url: '192.168.1.101',
        icon: 'ion-ios7-monitor',
        info: ['電腦上的伺服器', '可以看電影之類的']
    }
]

class Item {
    constructor(data) {
        this.title = data.title || ''
        this.url = data.url || ''
        this.icon = data.icon || ''
        this.info = data.info || []
    }
}

for (let i = 0; i < 15; ++i) {
    if (i < links.length) {
        const item = links[i]
        let info = ''
        item.info.map((e) => info += `<li>${e}</li>`)
        $('.grid').append(`
            <a class="item item_" href=${item.url}>
                <i class="${item.icon}"></i>
                <span>${item.title}</span>
                <section class="info">
                    <ol>${info}</ol>
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
            <input id="info" class="swal2-input" placeholder="說明" value="一個網頁">
        `,
        preConfirm: function () {
            return new Promise((resolve) => {
                resolve({
                    title: $('#title').val(),
                    url: $('#url').val(),
                    icon: $('#icon').val(),
                    info: $('#info').val().split(',')
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