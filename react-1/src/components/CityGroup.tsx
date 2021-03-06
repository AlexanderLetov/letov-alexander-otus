import { Card, CardGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ICity } from '../interfaces/ICity'

interface Props {
   data: ICity[];
}

export default function CityGroup({ data }: Props) {
   const cityList = (data).map((city: ICity) =>
      <Card style={{ width: '18rem' }}>
         <Card.Img src="https://res.cloudinary.com/rebelwalls/image/upload/b_black,c_fill,f_auto,fl_progressive,h_533,q_auto,w_800/v1428564559/article/R10621_image1" width="286" height="186" />
         <Card.Body>
            <Card.Title>{city.label}</Card.Title>
            <Link to={`/city/${city.value}`}>
               <Button variant="primary">Перейти к городу</Button>
            </Link>
         </Card.Body>
      </Card>
   );

   return (
      <CardGroup>
         {cityList}
      </CardGroup>
   )
}