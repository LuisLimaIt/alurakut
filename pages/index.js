import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelations';

function ProfileSideBar(props) {
  
  return (
    <Box>
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
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 classname="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form>
              <div>
                <input 
                  placeholder="Qual será o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual será o nome da sua comunidade?"
                  type="text"
                />
                <input 
                  placeholder="Adicione uma URL com a imagem da capa" 
                  name="title" 
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
              Pessoas da Comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((currentItem) => {
                return (
                  <li>
                    <a href={`/users/${currentItem}`} key={currentItem}>
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
