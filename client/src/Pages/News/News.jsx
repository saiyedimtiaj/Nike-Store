const News = () => {
    const blogs = [
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--pcJ36n8o--/c_crop,h_720,w_1080,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/3cc48e6e-8073-48b2-a801-064b69a2946c/newjeans-opens-nike-orchard-road-32.jpg?_a=BAAAROBs',
            title:"Nike’s Project Dreamweaver Supports Women’s Marathon Dreams",
            relese: "February 01, 2024"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--vgE_Bd_k--/c_crop,h_2133,w_3199,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/26a0a8b9-cc94-43e0-839e-c5ba87c837ef/1-su24-tatum-2-vortex-hero.jpg?_a=BAAAROBs',
            title:"The Tatum 2 Powers Jayson Tatum’s Effortless Game",
            relese: "December 25, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--B-IN79ee--/c_crop,h_1799,w_2698,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/c04dbd83-c510-4059-b99c-583431fb3d7b/jordanbrand-retropreview-sp24-aj4reimagined-fv5029-006-a.jpg?_a=BAAAROBs',
            title:"Jordan Brand Retro Collection: Spring 2024",
            relese: "December 20, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--TNvnrJ3l--/c_crop,h_2000,w_3000,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/1c6a3ce0-b680-4919-bc9c-99c5d7bd5a07/l-r-dave-predigua-maj-comedoy-rae-tolentino-princess-giron-andrew-dumangas-jeff-daragay.jpg?_a=BAAAROBs',
            title:"Jordan Wings Introduces the Class of 2027 in the Philippines",
            relese: "November 15, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--7fsGjLZx--/c_crop,h_1428,w_2146,x_0,y_49/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/68b80352-ce51-4284-8dc4-448fca357a17/nike-patta-fcb-collection-1.jpg?_a=BAAAROBs',
            title:"Nike & FC Barcelona x Patta Collection Unites a New Generation of Fans",
            relese: "October 06, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--EtBWB54J--/c_crop,h_2134,w_3200,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/3a26361f-5359-4dbf-84d5-e55cbe184cf8/eliud-kipchoge-homepage-image.jpg?_a=BAAAROBs',
            title:"Nike and Eliud Kipchoge Celebrate 20 Years of Breaking Barriers",
            relese: "October 04, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--1n9aF38u--/c_crop,h_2133,w_3200,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/1b14a277-0358-45ee-84b7-cc453a2049e3/orf-homepage-hero.jpg?_a=BAAAROBs',
            title:"Championing All Athletes, Nike Teams With Olympic Refuge Foundation",
            relese: "September 06, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--WAOJnUht--/c_crop,h_2133,w_3200,x_0,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/d0aa935a-88f9-497f-bea6-20c9eccc516e/wc23-ntk-multi-fed-comms-3x2-cn-nl-033023.jpg?_a=BAAAROBs',
            title:"Introducing Nike's 2023 Football Kits and Collections",
            relese: "April 03, 2023"
        },
        {
            image: 'https://res.cloudinary.com/dmubfrefi/image/private/s--KRARw4wG--/c_crop,h_1932,w_2902,x_60,y_0/c_scale,w_640/f_auto/q_auto/v1/dee-about-cms-prod-medias/b2199be7-b62b-445d-b79c-0847ca9c5fed/ho22-nbacityedition-na-offbody-hero-master-02-re-2.jpg?_a=BAAAROBs',
            title:"Nike NBA City Edition Combines the Heart and Soul of Hoops Culture",
            relese: "November 10, 2022"
        },
    ]
  return (
    <div>
      <div
        className="text-[#111111] mt-16 mb-20"
      >
        <p className="md:text-7xl text-4xl font-bold text-center">NIKE, INC. <br /> NEWSROOM</p>
      </div>
      <div className="container mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-6 gap-x-5">
        {
            blogs?.map((news,index)=><div key={index}>
                <img src={news?.image} alt="" />
                <h1 className="text-lg font-semibold mt-1">{news?.title}</h1>
                <p className="text-sm text-gray-800 mt-1">{news?.relese}</p>
            </div>)
        }
      </div>
    </div>
  );
};

export default News;
