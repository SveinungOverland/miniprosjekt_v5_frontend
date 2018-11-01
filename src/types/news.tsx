// Type imports
import Comment from './comment'


export default interface News {
    poster: string, // username
    poster_avatar?: string, // url
    header: string,
    content: string,
    peek?: string,
    timestamp: Date,
    image: string, // url
    category: string,
    quality: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    comments: Comment[]
}