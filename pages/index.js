import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AluraKutMenu } from '../src/lib/AluraCommons';

function ProfileSideBar(props) {
  
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'luislimait';
  return (
    <>
      {/* <AluraKutMenu /> */}
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            Bem-Vindo
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
          <Box>
            Pessoas da Comunidade (Amigos(as))
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
