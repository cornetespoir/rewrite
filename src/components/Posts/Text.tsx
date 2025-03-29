import React, { ReactElement } from 'react'

interface TextProps {
    body?: string
}

const Text = ({ body }: TextProps): ReactElement[] | null => {
    if (!body) return null
    const parsedHTML = new DOMParser().parseFromString(body, 'text/html')

    const renderNodes = (nodes: NodeListOf<ChildNode> | NodeList): ReactElement[] => {
        return Array.from(nodes).map((node, index) => {
            switch (node.nodeType) {
                case Node.ELEMENT_NODE:
                    const element = node as HTMLElement
                    const tagname = element.tagName.toLowerCase()

                    const attributeList = element.getAttributeNames()
                    const attributes: Record<string, string | {} | null> = {}
                    for (const attribute of attributeList) {
                        if (attribute != 'style')
                        attributes[attribute] = element.getAttribute(attribute)
                       if (attribute === 'style') {
                        const styles = element.getAttribute(attribute)?.split(';').map(cur => cur.split(':'))
                        const cssInObject = styles?.reduce((css: Record<string, string>, val) => {
                            let [key, value] = val;
                            key = key.replace(/-./g, css => css.toUpperCase()[1])
                            css[key] = value;
                            return css;
                        }, {})
                        if (cssInObject)
                        attributes[attribute] = cssInObject
                       }
                    }

                    switch (tagname) {
                        case 'source': 
                        return <source key={index} src={element.getAttribute('src') || ''} />
                        case 'img':
                            return <img key={index} src={element.getAttribute('src') || ''} alt={element.getAttribute('alt') || ''} />
                        case 'p': {
                            if (!node.textContent?.trim()) return null;
                            return (
                                <p key={index}>{renderNodes(node.childNodes)}</p>
                            )
                        }
                        case 'a': {
                            return <a key={index} href={element.getAttribute('href') ?? ''}>{renderNodes(node.childNodes)}</a>
                        }
                        case 'br': {
                            return <br key={index}/>
                        }
                        case 'hr': {
                            return <hr key={index}/>
                        }
                        default:
                            const Element = element.tagName.toLowerCase() as keyof JSX.IntrinsicElements
                            return (
                                <Element key={index} {...attributes}>
                                    {renderNodes(node.childNodes)}
                                </Element>
                            )
                    }
                case Node.TEXT_NODE:
                    return <span key={index}>{node.textContent}</span>
                default:
                    return null
            }
        }).filter(element => element !== null) as ReactElement[]
    }

    return renderNodes(parsedHTML.body.childNodes)
}

export { Text }
