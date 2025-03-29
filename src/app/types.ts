export type PostResults = {
    response: []
}

export type LastState = {
    timestamp:string
    tag:string
}

export interface UserData {
    name?: string
    title?: string
    url?: string
    
}

export interface PostData {
    blog: {}
    errors?: {}
    blog_name?: string
    body?: string
    date?: string
    id: number
    note_count: number
    post_url: string
    reblog_key: string
    tags?: []
    title?: string
    type: string
    photos?: []
    answer?: string
    asking_name?: string
    asking_url?: string
    question?: string
    timestamp: number
    interactability_reblog?: string
    source_url?: string
    summary?: string
    source_title?: string,
    description?: string,
    caption?: string,
    player?: []
}