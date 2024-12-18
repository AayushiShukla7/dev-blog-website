import { Injectable } from '@angular/core';
import { collection, doc, docData, FieldValue, Firestore, getDocs, increment, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { take } from 'rxjs';

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

    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'posts');

    const q = query(dbInstance, where("category.categoryId", "==", categoryId));  // Fetch category-specific posts
    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        result.push({ 'id': doc.id, 'data': doc.data()});
      });
    }
    
    result.splice(0,1);
    return result;
  }

  loadSinglePostData(postObj: any) {
    const docInstance = doc(this.firestore, 'posts', postObj.id);
    return docData(docInstance).pipe(take(1));
  }

  async loadSimilar(categoryId: any, postId: any) {
    
    var result: Array<any> = [{}];
    const dbInstance = collection(this.firestore, 'posts');

    const q = query(dbInstance, where("category.categoryId", "==", categoryId), limit(4));  // Fetch category-specific posts
    const querySnapshot = await getDocs(q);

    if(querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        
        if(doc.id != postId.id) {
          result.push({ 'id': doc.id, 'data': doc.data()});
        }        
      });
  
      result.splice(0,1);
    }
    
    return result;
  }

  async countViews(postId: any) {
    const viewsCount = {
      views: increment(1) 
    };

    const docInstance = doc(this.firestore, 'posts', postId);

    updateDoc(docInstance, viewsCount).then((docRef) => {
      console.log('Views Count Updated..!');
    })
    .catch(err => {
      console.log(err);
    });
  }
  
}
