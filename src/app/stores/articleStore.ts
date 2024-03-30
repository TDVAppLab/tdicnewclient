import {  makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Article, ArticleScreenInfoUpdDto } from "../models/article";


export default class ArticleStore {
    articleRegistry = new Map<string, Article>();
    selectedArticle: Article| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }


    loadArticles = async () => {
        this.loading = true;
        this.articleRegistry.clear();
        try {
            const articles = await agent.Articles.list();
            articles.forEach(article => {
                this.setArticle(article);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    loadArticle = async (id:string) => {

        
        
        if(id === "") {
            runInAction(()=>{
                this.selectedArticle = undefined;
            })
            return null;
        }


        this.loading = true;
        
        try {
            const object = await agent.Articles.details(id);
            this.setArticle(object);
            runInAction(()=>{
                this.selectedArticle = object;
            })
            this.setLoading(false);
            return object;
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    updateArticle = async (object: Article) => {
        //this.loading = true;
        
        try {
            await agent.Articles.update(object);
            runInAction(() => {
                this.articleRegistry.set(object.id_article, object);
                this.selectedArticle = object;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                //this.loading = false;
            })
        }
    }
    
    
    createArticle = async (object: Article) => {
        this.loading = true;
//        console.log(ArticleCreatDtoMapper(object));
        try {
//            await agent.Articles.create(object);
            const result_object = await (await agent.Articles.create(object)).data;
            runInAction(() => {
                this.articleRegistry.set(result_object.id_article, result_object);
//                this.selectedArticle = object;
                this.loading = false;
            })            
            return result_object;
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteArticle = async (object: Article) => {
        this.loading = true;
        
        try {
            await agent.Articles.deleteDeep(object.id_article);
            runInAction(() => {
                this.articleRegistry.delete(object.id_article);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    duplicateArticle = async (object: Article) => {
        this.loading = true;
        //console.log("duplicateArticle");
        try {
            //const result_object = await agent.Articles.duplicate(object.id_article);
            const result_object = await (await agent.Articles.duplicate(object.id_article)).data;
            //console.log(result_object);
            runInAction(() => {
                this.articleRegistry.set(result_object.id_article, result_object);
                this.loading = false;
            })
            return result_object;
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateArticleScreenInfo = async (object: ArticleScreenInfoUpdDto) => {
        try {
            await agent.Articles.updateScreenInfo(object);            
            const result_object = await agent.Articles.details(object.id_article);

            runInAction(() => {
                this.articleRegistry.set(object.id_article, result_object);
                this.selectedArticle = result_object;
            })
            
        }catch (error) {
            console.log(error);
        }
    }

    private setArticle = (article : Article) => {
        this.articleRegistry.set(article.id_article,article);
    }

    private getArticle=(id:string) => {
        return this.articleRegistry.get(id);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

}