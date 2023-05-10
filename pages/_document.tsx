import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
          <link rel="stylesheet" type="text/css" href={process.env.NEXT_PUBLIC_BASE_URL+'css/style.css'}/>
          <link rel="stylesheet" type="text/css" href={process.env.NEXT_PUBLIC_BASE_URL+'css/custom.css'}/>
          <link rel="stylesheet" type="text/css" href={process.env.NEXT_PUBLIC_BASE_URL+'css/chatcss.css'}/>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>
          <link rel="stylesheet" type="text/css" href="https://kenwheeler.github.io/slick/slick/slick.css"/> 
          <link rel="stylesheet" type="text/css" href="https://kenwheeler.github.io/slick/slick/slick-theme.css"/>
         
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script type="text/javascript" src="https://kenwheeler.github.io/slick/slick/slick.js"></script>
        <script src={process.env.NEXT_PUBLIC_BASE_URL+'js/custom.js'}> </script> 
         
        
      </body>
    </Html>
  )
}
