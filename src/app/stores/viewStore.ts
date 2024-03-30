import {  makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import type { OptionBase } from "../models/Optionbase";
import type { View } from "../models/view";

export default class ViewStore {
    viewRegistry = new Map<number, View>();
    selectedView: View| undefined = undefined;
    loading=false;
    id_article: string = "";

    constructor(){
        makeAutoObservable(this)
    }


    loadViews = async (id_article:string) => {

        
        
        if(id_article === "") {
            this.viewRegistry.clear();
            return null;
        }


        this.loading = true;
        this.viewRegistry.clear();
        this.selectedView = undefined;
        try {
            const views = await agent.Views.list(id_article);
            //@ts-ignore
            views.forEach(view => {
                this.setView(view);
            })
            runInAction(()=>{
                this.id_article=id_article;
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }

    setselectedView = async (id_view:number) => {
        let view = this.getView(id_view);
        if(view) {
            this.selectedView = view;
            runInAction(()=>{
                this.selectedView = view;
            })
            return view;
        } /*else {
            this.loadingInitial = true;
            try {
                instruction = await agent.Instructions.details(id_article,id_instruct);
                this.setInstruction(instruction);
                runInAction(()=>{
                    this.selectedInstruction = instruction;
                })
                this.setLoaingInitial(false);
                return instruction;
            } catch (error) {
                console.log(error);
                this.setLoaingInitial(false);
            }
        }*/
    }
    
    
    createView = async (object: View) => {
        //this.loading = true;
        try {
            //await agent.Views.create(object);
            const result_object = await (await agent.Views.create(object)).data;
            runInAction(() => {
                this.viewRegistry.set(result_object.id_view, result_object);
                this.selectedView = result_object;
            //    this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
            //    this.loading = false;
            })
        }
    }

    updateView = async (object: View) => {
        //this.loading = true;
        //console.log(object);
        
        try {
            await agent.Views.update(object);
            const result_object = await agent.Views.details(object.id_article, object.id_view);
            //const result_object = object;
            //console.log(result_object);
            runInAction(() => {
                this.viewRegistry.set(result_object.id_view, result_object);
                this.selectedView = result_object;
                //this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                //this.loading = false;
            })
        }
    }
    

    
    deleteView = async (object: View) => {
        this.loading = true;
        
        try {
            await agent.Views.delete(object.id_article, object.id_view);
            runInAction(() => {
                this.viewRegistry.delete(object.id_view);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }    

    

    getOptionArray=()=>{
        const ans = Array<OptionBase>();

        
        Array.from(this.viewRegistry.values()).map(object=>(
            ans.push({label: object.title, value: object.id_view.toString()})
        ))
        return ans;
    }

    private setView = (object : View) => {
        this.viewRegistry.set(object.id_view,object);
    }

    private getView=(id_view:number) => {
        return this.viewRegistry.get(id_view);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }
}