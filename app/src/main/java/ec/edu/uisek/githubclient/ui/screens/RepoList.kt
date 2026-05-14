package ec.edu.uisek.githubclient.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import ec.edu.uisek.githubclient.ui.components.RepoItem

@Composable
fun RepoList (){
    Column (
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ){
        RepoItem(
            name = "Proyecto de Django",
            description = "Un proyecto realizado en Django 5.2 para la materia de desarrollo web",
            avatarImg = "https://avatars.githubusercontent.com/u/9919?v=4",
            language = "Python"
        )
        RepoItem(
            name = "Proyecto de React",
            description = "Un proyecto realizado en React 18.5.2 para la materia de desarrollo web",
            avatarImg = "https://avatars.githubusercontent.com/u/9919?v=4",
            language = "Typecript"
        )
        RepoItem(
            name = "Proyecto de Android",
            description = "Un proyecto realizado en Kotlin para la materia de desarrollo móvil",
            avatarImg = "https://avatars.githubusercontent.com/u/9919?v=4",
            language = "Kotlin"
        )
        RepoItem(
            name = "Proyecto de iOS",
            description = "Un proyecto realizado en Swift 5.2 para la materia de desarrollo móvil",
            avatarImg = "https://avatars.githubusercontent.com/u/9919?v=4",
            language = "Swift"
        )
    }
}