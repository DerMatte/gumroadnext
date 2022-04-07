import Link from "next/link";
import Layout from "../components/Layout";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { getProducts } from '../lib/gumroad'
import Image from "next/image";
import he from 'he'

const stripedDescription = (description) => {
  const striped = description.replace(/<\/?[^>]+(>|$)/g, "");
  const decodedStripedHtml = he.decode(striped)
  return decodedStripedHtml;
}


const IndexPage = ({ products }) => {
  // const stripedHtml = product.description.replace(/<[^>]+>/g, '')

  return (
    <Layout title="Gumroadnext">
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Gumroad Shop</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="py-8 text-6xl font-bold">
            Gumroad Shop 🛒
          </h1>

          <div className="mx-auto py-32">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 space-x-4">
              {products.map(product => (
                <div key={product.id}>
                  <div className="w-full max-w-sm mx-2">
                    <div className="flex flex-col rounded overflow-hidden shadow-lg">
                      <div className="h-64 w-96 relative">
                        <Link href={`/product?id=${product.id}`}>
                          <a>
                            <Image
                              className=""
                              src={product.preview_url}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                            // width={1600}
                            // height={1000}

                            />
                          </a>
                        </Link>
                      </div>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {product.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {stripedDescription(product.description)}
                        </p>

                        {/* <a className="gumroad-button" href="https://lanasdev.gumroad.com/l/mgdzp?wanted=true" data-gumroad-single-product="true" className="z-10">Buy on</a> */}
                        <div className="gumroad-product-embed mt-8  border p-3 w-32 bg-cyan-600 hover:bg-cyan-800 shadow-md hover:shadow-xl text-white text-center">
                          <a className="inherit" href="https://lanasdev.gumroad.com/l/mgdzp"> Buy for {product.price / 100}€</a>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <pre>{JSON.stringify(products, null, 2)}</pre> */}
        </main>
      </div >
    </Layout >
  )
}




export const getStaticProps: GetStaticProps = async (context) => {

  const data = await getProducts()
  if (!data.success) {
    console.log("error", data.success);
    return { props: { products: [] } }
  }
  const products = data.products


  return {
    props: {
      products
    }
  }
}



export default IndexPage;
