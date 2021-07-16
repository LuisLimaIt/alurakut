import React, { useEffect, useState } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

function ProfileSideBar(props) {
  
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {props.items.map((currentItem, i) => {
          if(i <= 5) {
            return (
              <li key={currentItem}>
                <a href={`/users/${currentItem}`}>
                  <img src={`https://github.com/${currentItem.login}.png`} />
                  <span>{currentItem.login}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'luislimait';
  const [communities, setCommunities]= useState([]);
  const [text, setText] = useState('');
  const favoritePeople = [
    'fernandaabreu', 
    'omariosouto', 
    'peas', 
    'juunegreiros', 
    'rafaballerini', 
    'marcobrunodev',
  ]

  const [followers, setFollowers] = useState([]);

  useEffect(function(){
    // GET API GitHub
    fetch('https://api.github.com/users/LuisLimaIt/followers')
    .then(function(resp) {
      if(resp.ok) {
        return resp.json()
      }
      throw new Error(`Aconteceu algum problema! :( ${resp.status}`)
    })
    .then(function(resp){
      setFollowers(resp)
    })
    .catch((erro) => {
      console.log(erro)
    })

    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers:{
        'Authorization': 'df90e03b94490e658995b8e7882037',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }, 
      body: JSON.stringify({ "query": `query {
        allCommunities{
          title,
          id
          imageUrl,
          creatorSlug
        }
      }`})
    })
    .then((resp) => resp.json())
    .then((resp) => {
      const communitiesComingFromDato = resp.data.allCommunities;
      setCommunities(communitiesComingFromDato);
    })
    .catch((erro) => {
      console.log(erro)
    })
  },[]);
  // criar box com map baseado nos itens do array gitHub

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);

              console.log('Campo: ', formData.get('title'));
              console.log('Campo: ', formData.get('image'));

              const community = {
                title: formData.get('title'),
                image: formData.get('image'),
                creatorSlug: githubUser,
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
              .then(async (response) => {
                const data = await response.json();
                console.log(data.recordCreated)

                const community = data.recordCreated;
                const updateCommunities=[...communities, community];
                setCommunities(updateCommunities)
              })
            }}>
              <div>
                <input 
                  placeholder="Qual será o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual será o nome da sua comunidade?"
                  type="text"
                  onChange={(e) => setText(e.target.value)}
                />
                <input 
                  placeholder="Adicione uma URL com a imagem da capa" 
                  name="image" 
                  aria-label="Adicione uma URL com a imagem da capa"
                />
              </div>
              <button>
                  Criar comunidade
              </button>
            </form>
          </Box>

        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((currentItem) => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/communities/${currentItem.id}`}>
                      <img src={currentItem.imageUrl} />
                      <span>{currentItem.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((currentItem) => {
                return (
                  <li key={currentItem}>
                    <a href={`/users/${currentItem}`}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
