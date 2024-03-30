import {  makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import type { mArticleStatus } from "../models/mArticleStatus";
import type { OptionBase } from "../models/Optionbase";



export default class MArticleStatusStore {
    statusRegistry = new Map<number, mArticleStatus>();
    selectedStatus: mArticleStatus| undefined = undefined;
    loading=false;

    constructor(){
        makeAutoObservable(this)
    }

    loadStatuses = async () => {
        this.loading = true;
        this.statusRegistry.clear();
        try {
            const statuses = await agent.MArticleStatus.list();
            //@ts-ignore
            statuses.forEach(status => {
                this.setStatus(status);
            })
            this.setLoaing(false);
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
    }

    loadStatus = async (id:number) => {

        this.loading = true;
        try {
            const status = await agent.MArticleStatus.details(id);
            this.setStatus(status);
            runInAction(()=>{
                this.selectedStatus = status;
            })
            this.setLoaing(false);
            return status;
        } catch (error) {
            console.log(error);
            this.setLoaing(false);
        }
        
    }

    
    createStatus = async (status: mArticleStatus) => {
        this.loading = true;
        try {
            await agent.MArticleStatus.create(status);
            runInAction(() => {
                this.statusRegistry.set(status.id, status);
                this.selectedStatus = status;
                this.loading = false;
            })            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    updateStatus = async (status: mArticleStatus) => {
        this.loading = true;
        
        try {
            await agent.MArticleStatus.update(status);
            runInAction(() => {
                this.statusRegistry.set(status.id, status);
                this.selectedStatus = status;
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteStatus = async (Id: number) => {
        this.loading = true;
        
        try {
            await agent.MArticleStatus.delete(Id);
            runInAction(() => {
                this.statusRegistry.delete(Id);
                this.loading = false;
            })
            
        }catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    private setStatus = (status : mArticleStatus) => {
        this.statusRegistry.set(status.id, status);
    }

    private getStatus=(id:number) => {
        return this.statusRegistry.get(id);
    }

    getOptionArray=()=>{
        const ans = Array<OptionBase>();

        
        Array.from(this.statusRegistry.values()).map(status=>(
            ans.push({label: status.name, value: status.id.toString()})
        ))
        return ans;
    }

    setLoaing = (state: boolean) => {
        this.loading = state;
    }

}
