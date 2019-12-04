export default class BookstoreService {

    data = [
        {
            id: 1,
            title: 'Captain america',
            auther: 'Marvel',
            price: 25,
            coverImage: 'https://upload.wikimedia.org/wikipedia/he/3/37/Captain_America_The_First_Avenger_poster.jpg'
        },
        {
            id: 2,
            title: 'Iron Man',
            auther: 'Marvel',
            price: 34,
            coverImage: 'https://upload.wikimedia.org/wikipedia/he/thumb/7/77/Iron_Man_Bleeding_Edge_Armor.jpg/250px-Iron_Man_Bleeding_Edge_Armor.jpg'
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                return resolve(this.data);
            }, 1000);
        });
    }
}
