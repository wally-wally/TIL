import Product from '@/components/Product'
import EditProduct from '@/components/EditProduct'
// ...
{
    // ...
    path: '/product/:id',
    name: 'Id',
    component: Product,
    props: true,
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: EditProduct,
        props: true
      }
    ]
},
// ...
