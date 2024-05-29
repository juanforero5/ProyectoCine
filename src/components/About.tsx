/*export const About = () => {
    return (<>Este es el contenido de mi About</>
    )
 }*/

 // src/About.tsx


 import './About.css';
 import VeroImage from '../assets/images/Veronica.jpeg';
 import JuanImage from '../assets/images/Juan.jpeg';
 import GusImage from '../assets/images/Gustavo.jpeg';
 import YuliImage from '../assets/images/Yuliana.jpeg';

 const members = [
   {
     name: 'Veronica Osorio',
     email: 'veronica.osorio_bed@uao.edu.co',
     image: VeroImage,
     code: '2215512'
   },
   {
     name: 'Juan David Forero',
     email: 'juan_dav.forero@uao.edu.co',
     image: JuanImage,
     code: '2201263'
   },
   {
     name: 'Gustavo Gelpud',
     email: 'gustavo.gelpud@uao.edu.co',
     image: GusImage,
     code: '2201325'
   },
   {
     name: 'Yuliana Lugo',
     email: 'yuliana.lugo@uao.edu.co',
     image: YuliImage,
     code: '2170903'
   }
 ];
 
 export const About = () => {

   const imageSize = 200;
 
   return (
     <div className="about-container">
       <h1>Integrantes del Proyecto</h1>
       <div className="members-list">
         {members.map((member, index) => (
           <div className="member-card" key={index}>
             <img
               src={member.image}
               alt={member.name}
               style={{ width: imageSize, height: imageSize, borderRadius: '50%' }}
               className="member-image"
             />
             <div className="member-info">
               <h2><strong>{member.name}</strong></h2>
               <p>{member.email}</p>
               <p>{member.code}</p>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 };