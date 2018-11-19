// Type imports
import Comment from './comment'


export default interface News {
    poster: string, // username
    header: string,
    content: string,
    peek: string,
    timestamp: string,
    image: string, // url
    category: string,
    quality: number,
    comments: Comment[]
}