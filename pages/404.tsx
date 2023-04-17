import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <section className="banner-part p-0">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                    <img src={process.env.NEXT_PUBLIC_BASE_URL+'images/banner-4.jpg'} alt="banner-4" className="w-100 border-0 banner-left"/>
                    </div>
                    <div className="col-sm-6">
                    <div className="banner-text pages-text">
                    <h1>Error 404 - Page Not Found</h1>
                    <p>Sorry, but the page you are looking for could not be found. This could be because:</p>
                    <div className="banner-btn mb-5"><a href="/">Home Page</a></div>
                    
                    </div>
                    </div>
                </div>    
                </div>
            </section>
      
    </div>
  );
}