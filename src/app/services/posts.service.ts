import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private firestore: Firestore) { }

  async loadFeatured() {
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'posts');

    const q = query(dbInstance, where("isFeatured", "==", true), limit(4));  // Fetch 4 "Featured" posts
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      result.push({ 'id': doc.id, 'data': doc.data()});
    });

    result.splice(0,1);
    return result;
  }

  async loadLatest() {
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'posts');

    const q = query(dbInstance, orderBy("createdAt"));  
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      result.push({ 'id': doc.id, 'data': doc.data()});
    });

    result.splice(0,1);
    return result;
  }

  async loadCategoryPosts(categoryId: any) {
    //console.log(categoryId);
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'posts');

    const q = query(dbInstance, where("category.categoryId", "==", categoryId));  // Fetch category-specific posts
    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        result.push({ 'id': doc.id, 'data': doc.data()});
      });
  
      result.splice(0,1);
    }
    
    return result;
  }
  
}
