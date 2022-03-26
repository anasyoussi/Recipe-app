import React from 'react'
import { useEffect, useState } from 'react'; 
import styled from "styled-components"; 
import { useParams } from 'react-router-dom';


function Recipe() { 
  let params = useParams();  
  const [details, setDetails] = useState({}) ;
  const [activeTab, setActiveTab ] = useState('instructions');
  
  const fetchDetails = async () => {
    const check = localStorage.getItem('recipe'); 
    if(check){
      setDetails(JSON.parse(check)) ;
      console.log(details); 
    }else
    {
      const data = await fetch(`
        https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY} 
      `);
      const detailData = await data.json() ;
      setDetails(detailData.results); 
      console.log(detailData);
      localStorage.setItem('recipe', JSON.stringify(detailData));
    }
    
  }

  useEffect(() => {
      fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper> 

        <div>
            <h2>{ details.title }</h2>
            <Img src={details.image} alt="" />
        </div>


        <Info>
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>
            Insructions
          </Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ''}  onClick={() => setActiveTab('ingredients')}>
            Ingredients
          </Button>    
          {
            activeTab === 'instructions' && (
              <div>
                <h4 dangerouslySetInnerHTML={{__html:details.summary}} /> 
                <h4 dangerouslySetInnerHTML={{__html:details.instructions}} /> 
              </div>
            )
          }

          {
            activeTab === 'ingredients' && (
              <ul>
                {
                  details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}> {ingredient.original} </li>
                  ))
                }
              </ul>
            )
          }

        </Info>

        

    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`  
  margin-top: 6rem;
  display: flex;
  gap: 5rem;

  h2{
    margin-bottom: 2rem;
  }
  h4{
    font-weight: 400;
    font-size: 1.2rem;
  }
  ul {
    text-align: left; 
    font-size: 1.3rem; 
  }

  .active{
    color: white;
    background: linear-gradient(35deg, #494949, #313131); 
  }
`;
const Img = styled.img` 
   min-width: 250px;
   max-width: 251px;
   height: auto;
   border-radius: 1.5rem;
`;

const Button = styled.button`  
   padding: 1rem 1.5rem;
   outline: none;
   border: 2px solid #313131;
   margin-right: 1rem;
   cursor: pointer; 
   margin-bottom: 4rem; 
`;

const Info = styled.div` 
   text-align: center;
`; 


export default Recipe