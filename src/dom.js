window.dom = {   //创造我们的库,是我们提供的全局对象

    //增
    //dom.cerate(`<div>hi</div>`) 用于创建节点
    create(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    //dom.after(node,node2) 用于新增弟弟
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    //dom.(node,node2) 用于新增哥哥
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    //dom.append(parent,child) 用于新增儿子
    append(parent, node) {
        parent.appendChild(node)
    },
    //dom.wrap(`<div></div>`) 用于新增爸爸
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },



    //删
    //dom.remove(node) 用于删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    //dom.empty(parent) 用于删除后代
    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },



    //改
    //dom.attr(node,'属性名','属性值') 用于读写属性
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //dom.text(node,'修改的文本内容') 用于读写文本内容
    text(node, string) {//适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    //dom.html(node,?) 用于读写HTML内容
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }

    },
    //dom.style(node,{color:'red'}) 用于修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div, 'color')
                return node.style[name]
            } else if (name instanceof object) {
                //dom.style(div, {color:'red'})
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    //dom.class.add(node,'blue') 用于添加class
    class: {
        add(node, className) {
            node.classList.add(className)
        }
    },
    //dom.class.remove(node,'blue') 用于删除class
    remove(node, className) {
        node.classList.remove(className)
    },
    //dom.class.has(node,'blue') 查看是否node元素是否有'blue'类
    has(node, className) {
        return node.classList.contains(className)
    },
    //dom.on(node,'click',fn) 用于添加事件监听
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    //dom.off(node,'click',fn) 用于删除事件监听
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },


    //查
    //dom.find('选择器',node)[0] 用于获取标签或标签们
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    //dom.parent(node) 用于获取父元素
    parent(node) {
        return node.parentNode
    },
    //dom.children(node) 用于获取子元素
    children(node) {
        return node.children
    },
    //dom.siblings(dom.find('选择器')[0]) 用于获取兄弟姐妹元素
    siblings(node) {
        return Array(node.parentNode.children.children).filter(n => n !== node)
    },
    //dom.next(node) 用于获取弟弟
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //dom.previous(node) 用于获取哥哥
    previous(node) {
        let x = node.prev
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    //dom.each(dom.children(dom.find('选择器')), fn)[0] 用于遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    //dom.index(node) 用于获取排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}




