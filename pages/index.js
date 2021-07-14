import React, { useState } from 'react';
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

export default function Home() {
  const githubUser = 'luislimait';
  const [communities, setCommunities]= useState([{
    title: "Eu odeio acordar cedo", 
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    id: '126398126378162361'
  }]);
  const [text, setText] = useState('');
  const favoritePeople = [
    'fernandaabreu', 
    'omariosouto', 
    'peas', 
    'juunegreiros', 
    'rafaballerini', 
    'marcobrunodev',
  ]

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

              const community = {
                id: new Date().toISOString(),
                title: formData.get('title'),
                image: formData.get('image')

              }
              const updateCommunities=[...communities, community];
              setCommunities(updateCommunities);
              console.log('Campo: ', formData.get('title'));
              console.log('Campo: ', formData.get('image'));
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.map((currentItem) => {
                return (
                  <li key={currentItem.id}>
                    <a href={`/users/${currentItem.title}`}>
                      <img src={currentItem.image} />
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
