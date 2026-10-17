const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');menu.textContent=nav.classList.contains('open')?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.about-grid article,.why,.why-grid article,.feature-content,.festival-copy,.directory-title,.place,.detail-text,.sunrise p').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');const filter=btn.dataset.filter;document.querySelectorAll('.place').forEach(card=>{card.classList.toggle('hide',filter!=='all'&&card.dataset.category!==filter)})}));
document.getElementById('year').textContent=new Date().getFullYear();
const destinationGuides={
  'daranak-falls':{
    about:'Daranak Falls is one of Tanay and Rizal’s best-known waterfalls, with a dramatic cascade and a natural pool framed by greenery. It is a popular choice for a refreshing nature outing.',
    visit:'Located in Sampaloc, Tanay. Check current entrance arrangements, swimming conditions, and local advisories before traveling. Bring swimwear and a change of clothes if you plan to enter the water.'
  },
  'regina-rica':{
    about:'Regina Rica (Regina Rosarii Institute for Contemplation in Asia) is a 13.5-hectare sacred space in the Sierra Madre. Its grounds include the 71-foot Mama Mary Regina Rosarii statue, a chapel, picnic areas, restaurants, a retreat center, and an ecological sanctuary.',
    visit:'Visitors can make time for prayer, quiet reflection, and a walk around the grounds. Dress respectfully and check current visiting and Mass schedules with the venue before traveling.'
  },
  'mt-daraitan':{
    about:'Mt. Daraitan is a hiking destination in the Sierra Madre, known for its mountain scenery and views across the surrounding ridges when weather conditions are favorable. It can be paired with nearby attractions in Daraitan.',
    visit:'Plan for a substantial outdoor hike, changing weather, and uneven trails. Confirm current trail access, registration, guide requirements, and local conditions before setting out; bring water and suitable footwear.'
  },
  'san-ildefonso':{
    about:'San Ildefonso de Toledo Parish Church, commonly known as Tanay Church, is a Roman Catholic parish in the town center. Tanay’s first stone church was built in 1680, making the site an important part of local religious and historical heritage.',
    visit:'Be mindful of worship services and parish activities, dress modestly, and ask permission before photographing people or restricted areas. Check current Mass times with the parish.'
  },
  'vista-barista':{
    about:'Vista Barista is a café and bakeshop with a cozy, vintage-inspired atmosphere, suitable for a relaxed coffee or snack stop during a Tanay visit.',
    visit:'The café is listed along Manila East Road. Menus, hours, and availability can change, so check the venue’s latest information before making a special trip.'
  },
  'ness-cafe':{
    about:'Ness’ Cafe is a neighborhood coffee spot at Nesdy Compound, offering a casual place to pause while exploring the Plaza Aldea area.',
    visit:'Check the café’s latest listing for current menu options and hours. If traveling as a group, confirm seating availability in advance.'
  },
  'momarco':{
    about:'Momarco Forest Cove Resort and Hotel is a resort and hotel in a forest-side setting, described as a place for relaxation and enjoyment in Tanay.',
    visit:'Contact the resort directly to confirm room availability, facilities, rates, booking requirements, and directions; these details may change.'
  },
  'parola':{
    about:'Parola and its lakeshore are known for open views of the lake and surrounding mountains, offering a scenic place to enjoy Tanay’s landscape.',
    visit:'The location is listed in Barangay San Isidro. Confirm local access and weather conditions before traveling, bring sun protection, and respect the shoreline and nearby communities.'
  },
  'kinabuan-falls':{
    about:'Kinabuan Falls is a nature destination in Barangay Sta. Ines for visitors interested in trekking and exploring the countryside around Tanay.',
    visit:'Wear sturdy footwear, bring water, and prepare for changing trail and weather conditions. Ask local tourism contacts about access, guide arrangements, and current safety advisories.'
  },
  'daraitan-river':{
    about:'The Daraitan River and Tinipak na Bato are a well-known nature destination, combining a river landscape with distinctive rock formations. The area can be paired with a visit to Mt. Daraitan.',
    visit:'River conditions and access can change with weather. Confirm local requirements, guide arrangements, and safety advisories before visiting; avoid entering the water when conditions are unsafe.'
  },
  'pranetto-hills':{
    about:'Pranetto Hills is a leisure destination in Sitio Mayagay, described as having a large swimming pool and detached air-conditioned cottages for families and groups.',
    visit:'Ask the venue about day-use access, cottage capacity, rates, pool rules, and reservations before traveling, as availability and policies may vary.'
  },
  'camp-capinpin':{
    about:'Camp Mateo Capinpin in Barangay Sampaloc is the home of the Philippine Army’s 2nd Infantry Division, known as the Jungle Fighters, and is part of Tanay’s military heritage.',
    visit:'This is an active military installation. Access may be restricted; do not enter without authorization. Contact the appropriate authorities first about any official visit.'
  },
  'el-patio-razon':{
    about:'El Patio Razon is a rustic guesthouse in Sitio Maysawa, described as offering simple accommodation, outdoor baths, mountain views, and a fire pit.',
    visit:'Contact the property in advance to confirm room availability, facilities, rates, directions, and rules for shared outdoor spaces.'
  }
};
function addDestinationGuide(container,id){
  const guide=destinationGuides[id];
  if(!container||!guide)return;
  const panel=document.createElement('div');
  panel.className='destination-guide';
  const heading=document.createElement('h3');
  heading.textContent='PLAN YOUR VISIT';
  panel.appendChild(heading);
  [['ABOUT THIS PLACE',guide.about],['VISITOR INFORMATION',guide.visit]].forEach(([title,text])=>{
    const subheading=document.createElement('h4');
    subheading.textContent=title;
    const paragraph=document.createElement('p');
    paragraph.textContent=text;
    panel.append(subheading,paragraph);
  });
  const action=container.querySelector('.pill');
  container.insertBefore(panel,action||null);
}
// Build a Google Maps embed and directions link for each destination using the
// exact destination heading/address already present in the project.
function makeMapPanel(name, address, extraClass='') {
  const panel=document.createElement('div');
  panel.className=`map-panel ${extraClass}`.trim();
  const query=encodeURIComponent([name,address,'Tanay Rizal Philippines'].filter(Boolean).join(', '));
  const embed=`https://www.google.com/maps?q=${query}&output=embed`;
  const directions=`https://www.google.com/maps/dir/?api=1&destination=${query}`;
  panel.innerHTML=`<h4>LOCATION MAP · ${name.replace(/[&<>"']/g,'')}</h4><iframe title="Map showing ${name.replace(/[&<>"']/g,'')}" src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><div class="map-actions"><span>Map location based on the destination name and address shown on this page.</span><a href="${directions}" target="_blank" rel="noopener noreferrer">OPEN DIRECTIONS ↗</a></div>`;
  return panel;
}

// Keep one map on each destination detail, reusing any map already in the HTML.
const fallsSection=document.querySelector('.feature-falls');
if(fallsSection){
  addDestinationGuide(fallsSection.querySelector('.feature-content'),'daranak-falls');
  const content=fallsSection.querySelector('.feature-content');
  if(content&&!content.querySelector('.location-map, .map-panel')){
    content.appendChild(makeMapPanel('Daranak Falls','Sampaloc, Tanay, Rizal, Philippines'));
  }
}
document.querySelectorAll('.detail').forEach(section=>{
  addDestinationGuide(section.querySelector('.detail-text'),section.id);
  const title=section.querySelector('h2')?.textContent.trim() || 'Tanay destination';
  const address=section.querySelector('.location')?.textContent.trim() || 'Tanay, Rizal, Philippines';
  const content=section.querySelector('.detail-text');
  if(content&&!content.querySelector('.location-map, .map-panel')){
    content.appendChild(makeMapPanel(title,address));
  }
});

// Animate destination detail pages and map frames when they enter the viewport.
document.querySelectorAll('.directory-detail,.location-map,.map-frame').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
// Ensure destination card detail links scroll to their matching sections.
document.querySelectorAll('.place a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{const target=document.querySelector(link.getAttribute('href'));if(target){target.classList.add('visible')}}));
