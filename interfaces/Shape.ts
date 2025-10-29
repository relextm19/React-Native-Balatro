import { SharedValue } from 'react-native-reanimated'

export enum Shape{
    Rectangle
}

export interface IShape{
    x: SharedValue<number>;
    y: SharedValue<number>;
    type: Shape;
    id: number;
} 

export interface IRectangle extends IShape{
    type: Shape.Rectangle //always a rectangle
    width: number;   
    height: number;
}