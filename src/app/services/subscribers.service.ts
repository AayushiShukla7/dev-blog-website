import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  addSubs(subData: any) {
    // Create Firestore DB Instance (collection)
    const dbInstance = collection(this.firestore, 'subscribers');

    // Add the new data to the collection => To Firestore DB
    addDoc(dbInstance, subData)
    .then((docRef) => {
      console.log('Subscriber Saved Successfully!');

      this.toastr.success('Subscriber Saved Successfully!', 'SUCCESS', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    })
    .catch(err => {
      this.toastr.error(err.error, 'ERROR!', {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      } );
    });
  }

  async checkSubs(subEmail: any) {
    var result: any;

    const dbInstance = collection(this.firestore, 'subscribers');
    const q = query(dbInstance, where("email", "==", subEmail)); 
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      if(doc.data()['email'] == subEmail) {
        result = doc;
      }
    });

    return result;
  }

}
